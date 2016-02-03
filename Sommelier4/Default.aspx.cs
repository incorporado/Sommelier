using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Data.SqlClient;

namespace Sommelier4
{
    public partial class Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            using (SqlConnection con = new SqlConnection("Data Source=localhost;Integrated Security=true;Initial Catalog=Odestino"))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("SELECT TOP 1000 [Origen],[Destino],[Precio_Alta],[Precio_Baja] from [Precios]", con);
                SqlDataReader dr = cmd.ExecuteReader();
                GridView1.AutoGenerateColumns = true;
                GridView1.DataSource = dr;
                GridView1.DataBind();
                con.Close();
            }
        }
    }
}