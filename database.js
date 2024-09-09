const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'mydatabase.db');

class CustomDatabase {
  constructor() {
    this.sql = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Veritabanına bağlanırken hata oluştu:', err.message);
      } else {
        console.log('Veritabanına başarıyla bağlanıldı.');
      }
    });
  }

  async getUser(email) {
    return new Promise((resolve, reject) => {
      this.sql.get(
        'SELECT * FROM user WHERE email = ?',
        [email],
        function (err, user) {
          if (err) {
            return reject(new Error(err));
          }
          if (!user) {
            console.log('Kullanıcı bulunamadı');
            return resolve(null);
          }
          resolve(user);
        }
      );
    });
  }
  async createUser({ username, email, password }) {
    return new Promise(async (resolve, reject) => {
      const user = await this.getUser(email);
      if (user) {
        //TODO: Kullanıcıyı döndürebilrisin ya da hata döndürebilirsin.
        reject(new Error('Kullanıcı zaten var'));
      }
      //FEATURE: Burada salt ve hash oluşturulacak.
      const sql =
        'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
      this.sql.run(sql, [username, email, password], function (err) {
        if (err) {
          return reject(new Error('Veritabanı hatası'));
        }
        resolve({
          id: this.lastID,
          username,
          email,
          password,
        });
      });
    });
  }
  async deleteUser(email) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM user WHERE email = ?';
      this.sql.run(sql, [email], function (err) {
        if (err) {
          return reject(new Error(err));
        }
        resolve(this.changes);
      });
    });
  }
  async updateUser(email, { username, password }) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE user SET username = ?, password = ? WHERE email = ?';
      this.sql.run(sql, [username, password, email], function (err) {
        if (err) {
          return reject(new Error(err));
        }
        resolve(this.changes);
      });
    });
  }
}

module.exports = new CustomDatabase();

