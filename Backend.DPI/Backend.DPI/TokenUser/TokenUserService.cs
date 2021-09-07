﻿using Backend.DPI.TokenUser;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Backend.DPI.TokenUser
{
    public class TokenUserService
    {
        private readonly string ServerFrontEnd = "http://localhost:4200";


        public async Task<bool> TokenValidationUserAsync(string Token) {
            await Task.Delay(100);
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Si puedes sonarlo, puedes programarlo"));
            var myIssuer = ServerFrontEnd;
            var myAudience = ServerFrontEnd;
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(Token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = myIssuer,
                    ValidAudience = myAudience,
                    IssuerSigningKey = secretKey
                }, out SecurityToken validatedToken);
            }
            catch
            {
                return false;
            }
            return true;
        }


        public async Task<string> GetTokenAsync()
        {
            await Task.Delay(100);
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Si puedes sonarlo, puedes programarlo"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: ServerFrontEnd,
                audience: ServerFrontEnd,
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: signinCredentials
            );
            return new JwtSecurityTokenHandler().WriteToken(tokeOptions);
        }



    }
}
