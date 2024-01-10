def process_focus(focus):
    if focus is not None:
        if isinstance(focus, (list, tuple)):
            modified_focus = ", ".join(str(item) for item in focus)
        else:
            modified_focus = focus
        return modified_focus
    return None

def extract_entries_with_list_type(data):
    results = []
    def recurse(data, current_entries=None):
        if isinstance(data, dict):
            if 'entries' in data and isinstance(data['entries'], list):
                # Found an 'entries' list, update the current entries being processed
                current_entries = data['entries']
            for value in data.values():
                recurse(value, current_entries)
        elif isinstance(data, list):
            for item in data:
                if isinstance(item, dict) and item.get('type') == 'list' and current_entries is not None:
                    # Found an 'items' list with 'type' as 'list', within an 'entries' list
                    results.append(current_entries)
                    break  # Stop further processing of this list
                recurse(item, current_entries)
    recurse(data)
    return results

def generate_html_from_extracted_entries_data(data):
    html_output = ""

    for sublist in data:
        # Assuming the first item of each sublist is the header
        html_output += f"<h4>{sublist[0]}</h4>\n"

        # Iterate over the items in the sublist
        for item in sublist[1:]:
            if isinstance(item, dict) and item.get('type') == 'list':
                html_output += "<ul>\n"
                for list_item in item.get('items', []):
                    html_output += f"  <li>{list_item}</li>\n"
                html_output += "</ul>\n"

    return html_output


def entry_to_html(data):
    html_output = ""

    # Process the first item as an h4 header
    if data:
        html_output += f"<h4>{data[0]}</h4>\n"

    # Process the 'entries' in the second item, if it exists and is a dictionary
    if len(data) > 1 and isinstance(data[1], dict) and 'entries' in data[1]:
        html_output += "<ul>\n"
        for entry in data[1]['entries']:
            html_output += f"  <li>{entry}</li>\n"
        html_output += "</ul>\n"

    return html_output



"""
def entry_processor(value):
    out = []
    def open_ul():
        out.append("<ul>")

    def add_item(item):
        out.append(f"<li>{item}</li>")

    def add_pre(item):
        out.append(f"<pre>{item}</pre>")

    def close_ul():
        out.append("</ul>")

    def type_processor(item):
        if item["type"] == "entries"
            add_item(item["name"])
            process_entry(item["entries"])
        if item["type"] == "table": # line 4773 
            item = json.dumps(item)
            add_pre(item) 
        if item["type"] == "list:  # line 5017
            the_list = json_list_to_html_list(item["entries"])
            out.append(the_list)


    def process_entry(entry, indent=0):
        open_ul()
        for item in entry:
            if isinstance(item, str):
                add_item(item)
            if isinstance(item, dict):
    
        close_ul()

    return "\n".join(out)
"""