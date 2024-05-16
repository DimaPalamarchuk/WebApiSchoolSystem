namespace SchoolSystemWEB.API.Models.Domain
{
    public class Grade
    {
        public Guid GradeId { get; set; }
        public float FirstTermin {  get; set; }
        public float SecondTermin { get; set; }

        public Guid SubjectId { get; set; }
        public Guid StudentId { get; set; }

        // Navigation properties
//        public Student Student { get; set; }
//        public Subject Subject { get; set; }
    }
}
