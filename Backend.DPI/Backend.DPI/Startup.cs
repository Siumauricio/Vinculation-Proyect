using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.DPI.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Backend.DPI.Repository;

namespace Backend.DPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => {
                options.AddPolicy("CorsPolicy", builder => builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader().AllowCredentials());
            });
            services.AddControllers();
         
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Backend.DPI", Version = "v1" });
            });
            services.AddDbContext<DPIContext>((s, o) => o.UseSqlServer(Configuration.GetSection("ConnectionDBSqlServer").Get<string>()));
            services.AddScoped<IPrivilegeRepository, PrivilegeRepository>();
            services.AddScoped<IDepartmentRepository, DepartmentRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Backend.DPI v1"));
            }
            //
            //Scaffold-DbContext "Data Source=dpi.database.windows.net;Initial Catalog=DPI;User ID=admindpi;Password:dpiadmin1$;Connect Timeout=30;Encrypt=True;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -f

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
