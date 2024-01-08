import re

def convert_simple_weapon_tags_to_links(text):
    # Define the regex pattern to find and capture the parts of the tags
    # pattern = r'\{@filter ([^|]*)\|[^}]*type=simple weapon[^}]*\}'
    pattern = r'\{@filter ([^|]*)\|[^}]*type=(simple|martial) weapon[^}]*\}'

    # Function to replace each match
    def replace_match(match):
        # Extract the first element to use as link text
        link_text = match.group(1).strip()
        return f'<a href="/components/items/category/common-weapons.html">{link_text}</a>'

    # Use re.sub() to replace the pattern in the text
    return re.sub(pattern, replace_match, text)

def convert_instrument_tags_to_links(text):
    # Define the regex pattern to find and capture the parts of the tags
    pattern = r'\{@filter ([^|]*)\|[^}]*type=instrument[^}]*\}'

    # Function to replace each match
    def replace_match(match):
        # Extract the first element to use as link text
        link_text = match.group(1).strip()
        return f'<a href="/components/items/category/instruments.html">{link_text}</a>'

    # Use re.sub() to replace the pattern in the text
    return re.sub(pattern, replace_match, text)

def convert_item_tags_to_links(text):
    # Define a regular expression pattern to find all tags
    pattern = r'\{@item ([^}]+)\}'
    
    # Function to process each match
    def replace_with_link(match):
        parts = match.group(1).split('|')
        # Split the content of the tag on '|'
        # Extract the first part and replace spaces with dashes, add '.html' at the end
        item_name = parts[0].strip().replace(' ', '-').lower() + '.html'
        # Construct the URL
        url = f'/components/items/{item_name}'
        # Construct the HTML link
        link_text = parts[0] if len(parts) > 0 else "Item"
        return f'<a href="{url}">{link_text}</a>'

    # Use the sub method to replace each match with the result of replace_with_link
    return re.sub(pattern, replace_with_link, text)

def geraldine(in_data):
    content = in_data["template_content_string"]
    content = convert_item_tags_to_links(content)
    content = convert_simple_weapon_tags_to_links(content)
    content = convert_instrument_tags_to_links(content)
    return content