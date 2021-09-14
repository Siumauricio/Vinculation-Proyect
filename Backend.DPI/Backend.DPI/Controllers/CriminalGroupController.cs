using Backend.DPI.ModelDto;
using Backend.DPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Controllers
{

    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class CriminalGroupController : Controller
    {
        private readonly ICriminalGroupRepository _criminalGroupRepository;
        public CriminalGroupController(ICriminalGroupRepository criminalGroupRepository)
        {
            this._criminalGroupRepository = criminalGroupRepository;
        }



        [HttpGet("GetCriminalGroups")]
        public async Task<ActionResult<CriminalGroupDto>> GetCriminalGroups() {
            var result = await  this._criminalGroupRepository.GetCriminalGroupsAsync();
            return (result!=null)?
            Ok(result.Select(x => new CriminalGroupDto
            {
                IdCg = x.IdCg,
                NombreGrupoCriminal = x.NombreGrupoCriminal
            }))
            :Ok(null);
        }


    }
}
