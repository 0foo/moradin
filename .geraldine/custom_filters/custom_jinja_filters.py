def hello_world(value):
    return "hello world"

def json_list_to_html_list(value):
    out = []
    out.append("<ul>")
    for item in value:
        out.append(f"<li>{item}</li>")
    out.append("</ul>")
    return "\n".join(out)

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

def format_as_item_href(value):
    # Lowercase the string and replace spaces with dashes
    formatted_value = value.lower().replace(" ", "-")

    # Create the HTML a href string
    href = f'<a href="/components/items/{formatted_value}.html">{value}</a>'

    return href



