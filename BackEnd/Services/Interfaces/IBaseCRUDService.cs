using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Services
{
    public interface IBaseCRUDService<DALModel, ViewModel, InputModel, IdType>
    {
        public IEnumerable<ViewModel> GetAll();

        public IEnumerable<ViewModel> GetAll(params Expression<Func<DALModel, object>>[] includeExpressions);

        public ViewModel Get(IdType id);

        public void Save(InputModel model);

        public void Delete(IdType id);
    }
}
