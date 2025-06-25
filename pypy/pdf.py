import pdfplumber
pdf_file_path = '/Users/yuvi/mht cet tech/pypy/cutoff 2024_removed_removed_removed (2).pdf'

with pdfplumber.open(pdf_file_path) as pdf:
            page = pdf.pages[0]

            text=page.extract_text(x_tolerance=3, x_tolerance_ratio=None, y_tolerance=3, layout=False, x_density=7.25, y_density=13, line_dir_render=None, char_dir_render=None)
            print(text)

            



