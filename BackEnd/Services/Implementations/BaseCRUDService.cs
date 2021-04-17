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
    public class BaseCRUDService<DALModel, ViewModel, InputModel, IdType>
        : BaseService<DALModel>, IBaseCRUDService<DALModel, ViewModel, InputModel, IdType>
        where DALModel : class, IBaseDALModel<IdType>, new()
        where ViewModel : BaseViewModel<IdType>
        where InputModel : BaseInputModel<IdType>
    {
        public BaseCRUDService(IMapper mapper,
            IRepository<DALModel> DALModel,
            UserManager<User> userManager)
            : base(mapper, DALModel, userManager)
        { }

        public virtual IEnumerable<ViewModel> GetAll()
        {
            var result = this.repo.All();
            return mapper.Map<IEnumerable<ViewModel>>(result);
        }

        public virtual IEnumerable<ViewModel> GetAll(params Expression<Func<DALModel, object>>[] includeExpressions)
        {
            var result = this.repo.All(includeExpressions);
            return mapper.Map<IEnumerable<ViewModel>>(result);
        }

        public virtual ViewModel Get(IdType id)
        {
            var result = this.repo.All().FirstOrDefault(u => u.Id.Equals(id));
            return mapper.Map<ViewModel>(result);
        }

        public virtual void Save(InputModel model)
        {
            DALModel inputModel = mapper.Map<DALModel>(model);
            if (!model.IsIdEmpty() || this.repo.Exists(inputModel))
            {
                this.Update(inputModel);
            }
            else
            {
                this.Create(inputModel);
            }

            this.repo.Save();
        }

        protected virtual void Create(DALModel model)
        {
            this.repo.Add(model);
        }

        protected virtual void Update(DALModel model)
        {
            this.repo.Save(model);
        }

        public virtual void Delete(IdType id)
        {
            this.repo.Delete(id);
        }
    }
}
