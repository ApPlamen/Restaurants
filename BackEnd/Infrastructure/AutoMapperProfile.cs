﻿namespace Common.Infrastructure
{
    using AutoMapper;
    using DAL.Models;
    using DAL.InputModels;
    using DAL.ViewModels;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserInputModel, User>();
            CreateMap<User, UserViewModel>();
        }
    }
}