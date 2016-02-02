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

        string datosConexion = "Data Source=localhost;Initial Catalog=Odestino;Integrated Security=True";
        DataTable datos = new DataTable();

        protected void Page_Load(object sender, EventArgs e)
        {
            SqlConnection conn = new SqlConnection(datosConexion);
            SqlCommand cmd = new SqlCommand("SELECT * from [Precios]", conn);
            SqlDataReader dr;

            conn.Open();
            dr = cmd.ExecuteReader();
            
            DataTable MyDataTable = new DataTable();
            MyDataTable.Load(dr);

            GridView1.DataSource = MyDataTable;
            GridView1.DataBind();

            MyDataTable.Dispose();
            cmd.Dispose();
            conn.Dispose();
        }
    }
}