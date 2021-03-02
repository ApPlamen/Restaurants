using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Common.Authentication;
using DAL.Models;
using DAL.InputModels;
using DAL.Repository;
using DAL.ViewModels;
using Microsoft.EntityFrameworkCore;
using Exceptions;
using System;

namespace Services
{
    public class AccountService : BaseService<User>, IAccountService
    {
        private ITokenService tokenService;
        private SignInManager<User> signInManager;
        private UserManager<User> userManager;

        public AccountService(IMapper mapper,
            IRepository<User> user,
            ITokenService tokenService,
            SignInManager<User> signInManager,
            UserManager<User> userManager)
            : base(mapper, user)
        {
            this.tokenService = tokenService;
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        public async Task<UserTokensViewModel> LoginAsync(LoginUserInputModel model)
        {
            User user = await this.GetUserByEmailAsync(model.Email);

            SignInResult result = await this.signInManager.CheckPasswordSignInAsync(user, model.Password, false);

            if (result.Succeeded)
            {
                return new UserTokensViewModel()
                {
                    AccessToken = await this.GenerateJwtTokenAsync(user),
                    RefreshToken = this.GenerateRefreshToken(user),
                    Roles = user.Roles.Select(r => r.Role.Name).ToList(),
                };
            }

            throw new WrongCredentialsException();
        }

        public async Task RegisterAsync(RegisterUserInputModel model)
        {
            var userExists = await this.userManager.FindByEmailAsync(model.Email) != null;

            if(userExists)
            {
                throw new UserExistsException();
            }

            var newUser = new User
            {
                Id = Guid.NewGuid().ToString(),
                Email = model.Email,
                UserName = model.Username,

                NormalizedEmail = model.Email.ToUpper(),
                NormalizedUserName = model.Username.ToUpper(),

                Roles = new List<UserRole>
                {
                    new() { RoleId = RoleIds.Client }
                }
            };

            newUser.PasswordHash = new PasswordHasher<User>().HashPassword(newUser, model.Password);

            this.repo.Add(newUser);

            this.repo.Save();
        }

        public async Task<UserTokensViewModel> RefreshTokensAsync(string refreshToken)
        {
            try
            {
                this.tokenService.ValidateToken(refreshToken);

                string email = refreshToken.GetClaim(ClaimNames.Email);
                var user = await this.GetUserByEmailAsync(email);

                return new UserTokensViewModel()
                {
                    AccessToken = await this.GenerateJwtTokenAsync(user),
                    RefreshToken = this.GenerateRefreshToken(user),
                    Roles = user.Roles.Select(r => r.Role.Name).ToList(),
                };
            }
            catch (SecurityTokenException)
            {
                throw new NotAuthorizedException();
            }
        }

        private async Task<User> GetUserByEmailAsync(string email)
        {
            var user = await this.userManager.FindByEmailAsync(email);

            if (user == null)
            {
                throw new WrongCredentialsException();
            }

            var userfull = repo.All()
                .Include(u => u.Roles)
                .ThenInclude(r => r.Role)
                .Where(u => u.Id == user.Id)
                .FirstOrDefault();

            return userfull;
        }

        private async Task<string> GenerateJwtTokenAsync(User user)
        {
            List<Claim> claims = (await this.userManager.GetClaimsAsync(user)).ToList();

            // Specifically add the jti (nonce), iat (issued timestamp), and sub (subject/user) claims.
            // You can add other claims here, if you want:
            claims.AddRange(new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimNames.Email, user.Email),
            });

            foreach (var role in user.Roles)
            {
                claims.Add(new Claim(ClaimNames.Role, role.RoleId));
            }

            var test = this.tokenService.GenerateJwtToken(claims);

            return test;
        }

        private string GenerateRefreshToken(User user)
        {
            // You can add other claims here, if you want:
            var claims = new List<Claim>
            {
                new Claim(ClaimNames.UserId, user.Id.ToString()),
                new Claim(ClaimNames.Email, user.Email),
            };

            return this.tokenService.GenerateRefreshJwtToken(claims);
        }
    }
}
