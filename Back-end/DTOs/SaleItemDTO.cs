using System.Text.Json.Serialization;

namespace Back_end.DTOs
{
    public class SaleItemDTO
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public int ProductId { get; set; }
        [JsonIgnore]
        public int SaleId { get; set; }
    }
}