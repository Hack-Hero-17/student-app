import express from "express";
import cors from "cors";
import oracledb from "oracledb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionString: process.env.DB_CONNECTION_STRING,
};

app.get("/api/tables", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT table_name FROM user_tables`
    );
    res.json(result.rows.map((row) => row[0]));
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.get("/api/table/:tableName", async (req, res) => {
  const { tableName } = req.params;
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const columnResult = await connection.execute(
      `SELECT column_name FROM user_tab_columns WHERE table_name = :tableName`,
      [tableName.toUpperCase()]
    );
    const columns = columnResult.rows.map((row) => row[0]);

    const dataResult = await connection.execute(`SELECT * FROM ${tableName}`);
    const rows = dataResult.rows.map((row) => {
      let rowObject = {};
      columns.forEach((col, index) => {
        rowObject[col] = row[index];
      });
      return rowObject;
    });

    res.json({ columns, rows });
  } catch (error) {
    console.error("Error fetching table data:", error);
    res.status(500).json({ error: "Failed to fetch table data" });
  } finally {
    if (connection) await connection.close();
  }
});

app.post("/api/insert-stud", async (req, res) => {
  const { stdid, stdname, gender, ad_year } = req.body;
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `INSERT INTO stud (STDID, STDNAME, GENDER, AD_YEAR) VALUES (:stdid, :stdname, :gender, :ad_year)`,
      [stdid, stdname, gender, ad_year],
      { autoCommit: true }
    );

    res.json({ message: "Record inserted into stud successfully!" });
  } catch (error) {
    console.error("Error inserting into stud:", error);
    res.status(500).json({ error: "Failed to insert record into stud" });
  } finally {
    if (connection) await connection.close();
  }
});

app.post("/api/insert-admis-type", async (req, res) => {
  const { typeid, typename } = req.body;
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `INSERT INTO admis_type (type_id, type_name) VALUES (:typeid, :typename)`,
      { typeid, typename },
      { autoCommit: true }
    );

    res.json({ message: "Record inserted into admis_type successfully!" });
  } catch (error) {
    console.error("Error inserting into admis_type:", error);
    res.status(500).json({ error: "Failed to insert record into admis_type" });
  } finally {
    if (connection) await connection.close();
  }
});

// app.get("/api/tables/:tableName", async (req, res) => {
//   const { tableName } = req.params;

//   let connection;
//   try {
//     connection = await oracledb.getConnection(dbConfig);
//     const result = await connection.execute(`SELECT * FROM ${tableName}`);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: "Database error" });
//   } finally {
//     if (connection) {
//       await connection.close();
//     }
//   }
// });

// app.delete("/api/stud/:id", async (req, res) => {
//   let connection;
//   try {
//     connection = await oracledb.getConnection(dbConfig);
//     const { id } = req.params;
//     await connection.execute(`DELETE FROM stud WHERE stdid = :1`, [id], {
//       autoCommit: true,
//     });
//     res.json({ message: "Student deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   } finally {
//     if (connection) await connection.close();
//   }
// });

app.put("/api/update-stud", async (req, res) => {
  const { stdid, stdname } = req.body;
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `UPDATE stud SET stdname = :stdname WHERE stdid = :stdid`,
      [stdname, stdid],
      { autoCommit: true }
    );

    if (result.rowsAffected > 0) {
      res.json({ message: "Student name updated successfully!" });
    } else {
      res.status(404).json({ message: "Student ID not found" });
    }
  } catch (error) {
    console.error("Error updating student name:", error);
    res.status(500).json({ error: "Failed to update student name" });
  } finally {
    if (connection) await connection.close();
  }
});

app.put("/api/update-admis-type", async (req, res) => {
  const { typeid, typename } = req.body;
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `UPDATE admis_type SET type_name = :typename WHERE type_id = :typeid`,
      [typename, typeid],
      { autoCommit: true }
    );
    res.json({ message: "Admission type updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update admission type" });
  } finally {
    if (connection) await connection.close();
  }
});

app.delete("/api/delete-stud/:stdid", async (req, res) => {
  const { stdid } = req.params;
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(`DELETE FROM stud WHERE stdid = :stdid`, [stdid], {
      autoCommit: true,
    });
    res.json({ message: "Student deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student record" });
  } finally {
    if (connection) await connection.close();
  }
});

app.delete("/api/delete-admis-type/:typeid", async (req, res) => {
  const { typeid } = req.params;
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `DELETE FROM admis_type WHERE type_id = :typeid`,
      [typeid],
      { autoCommit: true }
    );
    res.json({ message: "Admission type deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete admission type record" });
  } finally {
    if (connection) await connection.close();
  }
});

app.post("/api/run-cursor", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const sql = `
      DECLARE
          CURSOR type_input IS 
              SELECT stdid FROM stud;
          
          rollno      stud.stdid%TYPE;
          year_check  NUMBER(4);
      BEGIN
          OPEN type_input;                       
          
          LOOP
              FETCH type_input INTO rollno;
              EXIT WHEN type_input%NOTFOUND;
              
              year_check := (rollno - 2023503000) / 100;
              
              IF year_check = 3 OR year_check = 7 THEN
                  UPDATE stud 
                  SET type = 'Lateral' 
                  WHERE stdid = rollno;
              
              ELSIF year_check = 0 THEN
                  UPDATE stud 
                  SET type = 'Regular' 
                  WHERE stdid = rollno;
              
              ELSE
                  UPDATE stud 
                  SET type = 'Self Supporting' 
                  WHERE stdid = rollno;
              END IF;
          END LOOP;
          
          CLOSE type_input;
          COMMIT;
      END;
    `;

    await connection.execute(sql);
    res.json({ success: true, message: "Cursor executed successfully!" });
  } catch (err) {
    console.error("Cursor execution error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to execute cursor." });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
