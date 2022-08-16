using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;//データベース

        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]//データベースへのアクセスは非同期処理を用いなければいけないなぜなら、データベースの処理中には他のリクエストを受け付けることができなくなってしまうから。
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()//ただのListでもいいけど、機能が多すぎるからIEnumerableを使う
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUsers(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}