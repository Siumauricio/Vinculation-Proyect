using Backend.DPI.ModelDto;
using Backend.DPI.Models;
using Backend.DPI.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DepartmentController : Controller
    {

        private readonly IDepartmentRepository departmentRepository;

        public DepartmentController(IDepartmentRepository _departmentRepository)
        {
            this.departmentRepository = _departmentRepository;
        }


        [HttpPost("AddDepartment")]

        public async Task<ActionResult<DepartmentDto>> AddDepartment(string name) {
            var result = await this.departmentRepository.CreateDepartmentAsync(name);
            return Ok(new DepartmentDto
            {
                Name = name
            });
        }

        [HttpGet("GetDepartments")]
        public async Task<ActionResult<IEnumerable<DepartmentDto>>> GetDepartment() {
            var result = await this.departmentRepository.GetDepartmentsAsync();
            return Ok(result.Select(x => new DepartmentDto
            {
                    IdDepartment=x.IdDepartment,
                    Name=x.Name
            }));
        }

        [HttpGet("GetDepartmentByName")]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartmentByName(string departmentName)
        {
            var result = await this.departmentRepository.GetDepartmentsByNameAsync(departmentName);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpDelete("DeleteDepartment")]
        public async Task<ActionResult<IEnumerable<User>>> DeleteDepartment(string departmentName)
        {
            var result = await departmentRepository.DeleteDepartmentAsync(departmentName);
       
            return Ok(result);
        }

    }
}
