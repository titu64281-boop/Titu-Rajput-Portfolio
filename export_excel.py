import sqlite3
from openpyxl import Workbook

def export_db_to_excel():
    # Database connection
    conn = sqlite3.connect("portfolio.db")
    
    # SQL query se data padhna
    query = "SELECT id, name, email, subject, message, created_at FROM contacts"
    cursor = conn.cursor()
    cursor.execute(query)
    rows = cursor.fetchall()
    conn.close()
    
    # Columns ke readable names
    headers = ["ID", "Full Name", "Email Address", "Subject", "Message Content", "Timestamp"]
    
    # Excel me export
    output_file = "portfolio_messages.xlsx"
    workbook = Workbook()
    worksheet = workbook.active
    assert worksheet is not None
    worksheet.append(headers)
    for row in rows:
        worksheet.append(row)
    workbook.save(output_file)
    print(f"Success! {len(rows)} records exported to '{output_file}'")

if __name__ == "__main__":
    export_db_to_excel()