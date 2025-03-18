import sys
import pdfplumber
import pandas as pd
import os

def extract_tables(pdf_path, excel_path):
    try:
        if not os.path.exists(pdf_path):
            print(f"Error: PDF file '{pdf_path}' not found.")
            return

        print(f"Processing PDF: {pdf_path}")

        with pdfplumber.open(pdf_path) as pdf:
            all_tables = []
            for page_num, page in enumerate(pdf.pages):
                # Try different table extraction strategies
                tables = page.extract_tables({
                    "vertical_strategy": "lines",
                    "horizontal_strategy": "lines",
                    "snap_tolerance": 3
                })
                
                if not tables:
                    print(f"No tables found on page {page_num + 1}, trying different settings...")
                    tables = page.extract_tables({
                        "vertical_strategy": "text",
                        "horizontal_strategy": "text",
                        "snap_tolerance": 3
                    })

                print(f"Page {page_num + 1}: Found {len(tables)} tables")

                for table_index, table in enumerate(tables):
                    clean_table = [[cell.strip() if cell else "" for cell in row] for row in table]
                    df = pd.DataFrame(clean_table)
                    all_tables.append((page_num + 1, table_index + 1, df))

        if not all_tables:
            print("Error: No tables extracted from the PDF.")
            return

        # Save extracted tables into an Excel file
        with pd.ExcelWriter(excel_path) as writer:
            for page_num, table_index, df in all_tables:
                sheet_name = f'Page{page_num}_Table{table_index}'
                df.to_excel(writer, sheet_name=sheet_name, index=False, header=False)

        print(f"Success: Output saved to {excel_path}")

    except Exception as e:
        print(f"Python Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Error: Missing arguments. Usage: python extract.py <pdf_path> <excel_path>")
    else:
        pdf_path = sys.argv[1]
        excel_path = sys.argv[2]
        extract_tables(pdf_path, excel_path)
