# hello world!
def hello_world(value):
    return "hello world"

# converts a list to a simple html structure, can pass in optional class
def json_list_to_html_list(value, the_class=None):
    out = []
    if the_class:
        out.append(f"<ul class={the_class}>")
    else:
        out.append("<ul>")
    for item in value:
        out.append(f"<li>{item}</li>")
    out.append("</ul>")
    return "\n".join(out)

# formats a string as a link to an items
def format_as_item_href(value):
    # Lowercase the string and replace spaces with dashes
    formatted_value = value.lower().replace(" ", "-")

    # Create the HTML a href string
    href = f'<a href="/components/items/{formatted_value}.html">{value}</a>'

    return href

# note: in the jinja template, each item in the list needs to be inside quotes, or if string only needs quotes as well
def without_keys(d, keys):
    if isinstance(keys, str):
        keys = [keys]

    if isinstance(d, dict):
        return {k: v for k, v, in d.items() if k not in keys}
    # else:
    #     raise (f"without_keys custom filters was passed a variable that's not dict {d}!!")
    return d

# note: in the jinja template, each item in the list needs to be inside quotes, or if string only needs quotes as well
def only_keys(d, keys):
    if isinstance(keys, str):
        keys = [keys]

    if isinstance(d, dict):
        return {k: v for k, v, in d.items() if k in keys}
    # else:
    #     raise (f"without_keys custom filters was passed a variable that's not dict {d}!!")
    return d

# returns the top level keys of the dict passed 
def top_level_keys(value):
    if isinstance(value, dict):
        return list(value.keys())
    return value

# returns a recursive type tree for all of the items in the json structure
def type_tree(obj):
    if isinstance(obj, dict):
        # Handle dictionaries by replacing each value with its type or a recursive call
        return {k: type_tree(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        # Handle lists by applying the same logic to each element
        return [type_tree(item) for item in obj if not (isinstance(item , str) or isinstance(item, int))]
    else:
        # For all other types, return the type as a string
        return str(type(obj).__name__)


def list_to_horizontal_html_table(lst, the_class=None):
    # Starting the table
    if the_class:
        html_table = f'<table class="{the_class}">\n'
    else:
        html_table = '<table>\n'

    # Adding table header row
    html_table += '<tr>\n'
    for item in lst:
        html_table += f'  <th>{item}</th>\n'
    html_table += '</tr>\n'

    # Ending the table
    html_table += '</table>'

    return html_table

def convert_to_html_lists(data_list):
    html_output = ""

    for data in data_list:
        choice_count = data.get("choose", {}).get("count", 0)
        choices = data.get("choose", {}).get("from", [])

        html_output += f'<ul><li>choose: {choice_count}</li><ul>'

        for choice in choices:
            html_output += f'<li>{choice}</li>'

        html_output += '</ul></ul><br>'

    return html_output

# looks up in a dictionary based on a list, ie ["0", "class", "1] will return dict[0]["class"][1]
def dict_lookup_function(input_dict, lookup_list):
    def is_int(key):
        try:
            int(key)
            return True
        except:
            return False
        
    current_dict = input_dict
    for key in lookup_list:
        if is_int(key):
            key = int(key)
            current_dict = current_dict[key]
            continue
        if key in current_dict:
            current_dict = current_dict[key]
        else:
            print(f"{key} not in dictionary")
            return None  # Key not found in the dictionary
    return current_dict


# pass a list of dicts in and a dot separated string(class.2.item.0.), will iterate the list and return a list of all values 
def extract_list_of_same_values(in_list, list_identifiers):
    the_lookup_list = list_identifiers.split(".")
    out = []
    for item in in_list:
        the_value = dict_lookup_function(item, the_lookup_list)
        if the_value:
            out.append(the_value)
    return out
