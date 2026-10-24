import sqlite3

conn = sqlite3.connect("portfolio.db")
cursor = conn.cursor()

cursor.execute("SELECT * FROM contacts")
rows = cursor.fetchall()

print("\n--- All Contact Messages in Database ---")
for row in rows:
    print(row)

conn.close()