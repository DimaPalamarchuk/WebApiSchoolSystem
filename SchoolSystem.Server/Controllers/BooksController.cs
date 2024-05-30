using Microsoft.AspNetCore.Mvc;
using SchoolSystem.Server.Data;

namespace SchoolSystem.Server.Controllers
{
    public class BooksController : ControllerBase
    {
        private readonly WebSystemDB dbContext;

        public BooksController(WebSystemDB dbContext)
        {
            this.dbContext = dbContext;
        }
    }
}
