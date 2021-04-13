using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using DAL.Models;
using DAL.InputModels;
using DAL.Repository;
using DAL.ViewModels;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq.Expressions;

namespace Services
{
    public class BaseCRUDSoftDeleteService<DALModel, ViewModel, InputModel, IdType>
        : BaseCRUDService<DALModel, ViewModel, InputModel, IdType>
        where DALModel : class, IBaseSoftDeleteDALModel<IdType>, new()
        where ViewModel : BaseViewModel<IdType>
        where InputModel : BaseInputModel<IdType>
    {
        public BaseCRUDSoftDeleteService(IMapper mapper,
            IRepository<DALModel> DALModel,
            UserManager<User> userManager)
            : base(mapper, DALModel, userManager)
        { }

        public virtual new IEnumerable<ViewModel> GetAll()
        {
            var result = this.repo.GetAll().Where(m => m.IsActive);
            return mapper.Map<IEnumerable<ViewModel>>(result);
        }

        public virtual new IEnumerable<ViewModel> GetAll(params Expression<Func<DALModel, object>>[] includeExpressions)
        {
            var result = this.repo.GetAll(includeExpressions).Where(m => m.IsActive);
            return mapper.Map<IEnumerable<ViewModel>>(result);
        }

        public virtual new void Delete(IdType id)
        {
            var entity = this.repo.GetById(id);

            entity.IsActive = false;

            this.repo.Save();
        }
    }
}
