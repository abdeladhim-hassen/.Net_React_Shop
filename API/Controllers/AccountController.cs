using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;

        public AccountController(
            UserManager<User> userManager,
            TokenService tokenService,
            StoreContext context)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            if (loginDto == null)
                return BadRequest("Invalid login request");

            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();

            var userBasket = await RetrieveBasket(loginDto.Username);
            var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

            if (anonBasket != null)
            {
                if (userBasket != null)
                    _context.Baskets.Remove(userBasket);

                anonBasket.BuyerId = user.UserName ?? throw new InvalidOperationException("User name is null");

                Response.Cookies.Delete("buyerId");
                await _context.SaveChangesAsync();
            }

            return new UserDto
            {
                Email = user.Email ?? string.Empty,
                Token = await _tokenService.GenerateToken(user),
                Basket = anonBasket != null ? anonBasket.MapBasketToDto() : userBasket?.MapBasketToDto()
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
        {
            if (registerDto == null)
                return BadRequest("Invalid registration request");

            var user = new User
            {
                UserName = registerDto.Username ?? throw new ArgumentNullException(nameof(registerDto.Username), "Username cannot be null"),
                Email = registerDto.Email
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                    ModelState.AddModelError(error.Code, error.Description);

                return ValidationProblem(ModelState);
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }


        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var userName = User.Identity?.Name;
            if (userName == null)
                return Unauthorized();

            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
                return NotFound();

            var userBasket = await RetrieveBasket(userName);

            return new UserDto
            {
                Email = user.Email ?? string.Empty,
                Token = await _tokenService.GenerateToken(user),
                Basket = userBasket?.MapBasketToDto()
            };
        }

        [Authorize]
        [HttpGet("savedAddress")]
        public async Task<ActionResult<UserAddress>> GetSavedAddress()
        {
            var userName = User.Identity?.Name;
            if (userName == null)
                return Unauthorized();

            var address = await _userManager.Users
                .Where(x => x.UserName == userName)
                .Select(user => user.Address)
                .FirstOrDefaultAsync();

            if (address == null)
                return NotFound();

            return address;
        }

        private async Task<Basket?> RetrieveBasket(string? buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(basket => basket.BuyerId == buyerId);
        }
    }
}
