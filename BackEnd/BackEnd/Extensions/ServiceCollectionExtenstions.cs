using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Reflection;
using Services;

namespace Domain.Extensions
{
    public static class ServiceCollectionExtenstions
    {
        public static IServiceCollection AddDomainServices(this IServiceCollection services)
        {
            Assembly
                .GetAssembly(typeof(IBaseService))
                .GetTypes()
                 .Where(t => t.IsClass && t.GetInterfaces().Any(i => i.Name == $"I{t.Name}") && t.Name != "Service" && !t.IsGenericType)
                .Select(t => new
                {
                    Interface = t.GetInterface($"I{t.Name}"),
                    Implementation = t
                })
                .ToList()
                .ForEach(s => services.AddScoped(s.Interface, s.Implementation));

            return services;
        }
    }
}
