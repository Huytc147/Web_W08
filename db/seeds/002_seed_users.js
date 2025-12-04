import bcrypt from "bcryptjs";

const users = [
  {
    username: "un01",
    name: "Nguyễn Văn A",
    email: "nguyenana@example.com",
    password: bcrypt.hashSync("123", 10),
  },
  {
    username: "un02",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    password: bcrypt.hashSync("123", 10),
  },
];

export async function seed(knex) {
  await knex.transaction(async (trx) => {
    // Xoá dữ liệu cũ (nếu có) để tránh trùng unique
    await trx("users").del();

    // Insert mới
    await trx("users").insert(users);
  });
}
