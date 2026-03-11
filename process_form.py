from pypdf import PdfReader, PdfWriter

# Path to your uploaded form
input_pdf = "FAA form 337.pdf"
output_pdf = "Project_3_2_Final_Submission.pdf"

try:
    reader = PdfReader(input_pdf)
    writer = PdfWriter()

    # Check if page 1 exists (0-indexed 1 is Page 2)
    if len(reader.pages) < 2:
        print(f"Error: Input PDF has only {len(reader.pages)} pages, but script requires at least 2.")
        exit(1)

    # Use append to preserve form structures better than add_page
    # Append Page 2 (index 1)
    writer.append(fileobj=reader, pages=[1])

    # Mapping your Project 3-2 and Credential data
    fields = {
        "Nationality and Registration Mark": "N8023C",
        "Make": "Piper",
        "Model": "PA-22-150",
        "Serial No": "22-2210",
        "Name": "Aviation Institute of Maintenance",
        "Address": "7251 West McCarty Street, Indianapolis, IN 46241",
        "Agency Name and Address": "Brandon Brooks, 1522 Miller Street, Buffalo, NY 11725",
        "Certificate No": "000100",
    }

    # Updating fields on the first page of our writer (which is the copy of reader's page 1)
    writer.update_page_form_field_values(writer.pages[0], fields)

    # Adding the technical description to the back (Page 3)
    if len(reader.pages) > 2:
        # Append Page 3 (index 2)
        writer.append(fileobj=reader, pages=[2])

        block_8_text = {
            "Description of Work Accomplished": (
                "Cleaned and inspected engine mount strut. Performed major repair by welding "
                "a scarf and outer sleeve using 4130 chrome-moly steel tubing per "
                "AC 43.13-1B, Ch. 4, Sec. 5, Para. 96, Figs. 4-38/4-39. Alignment verified "
                "within specifications. Brandon Brooks, A&P / IA 000100"
            )
        }
        # Update fields on the second page of our writer
        writer.update_page_form_field_values(writer.pages[1], block_8_text)

    with open(output_pdf, "wb") as output_stream:
        writer.write(output_stream)

    print("Automation Complete: Project_3_2_Final_Submission.pdf created.")

except FileNotFoundError:
    print(f"Error: The file '{input_pdf}' was not found in the current directory.")
except ImportError:
    print("Error: The 'pypdf' library is not installed. Please install it using 'pip install pypdf'.")
except Exception as e:
    import traceback
    traceback.print_exc()
    print(f"An unexpected error occurred: {e}")
