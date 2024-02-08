import re

def convert_simple_weapon_tags_to_links(text):
    # Define the regex pattern to find and capture the parts of the tags
    # pattern = r'\{@filter ([^|]*)\|[^}]*type=simple weapon[^}]*\}'
    pattern = r'\{@filter ([^|]*)\|[^}]*type=(simple|martial) weapon[^}]*\}'

    # Function to replace each match
    def replace_match(match):
        # Extract the first element to use as link text
        link_text = match.group(1).strip()
        return f'<a href="/compiled_data/items/category/common-weapons.html">{link_text}</a>'

    # Use re.sub() to replace the pattern in the text
    return re.sub(pattern, replace_match, text)

def convert_instrument_tags_to_links(text):
    # Define the regex pattern to find and capture the parts of the tags
    pattern = r'\{@filter ([^|]*)\|[^}]*type=instrument[^}]*\}'

    # Function to replace each match
    def replace_match(match):
        # Extract the first element to use as link text
        link_text = match.group(1).strip()
        return f'<a href="/compiled_data/items/category/instruments.html">{link_text}</a>'

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
        url = f'/compiled_data/items/{item_name}'
        # Construct the HTML link
        link_text = parts[0] if len(parts) > 0 else "Item"
        return f'<a href="{url}">{link_text}</a>'

    # Use the sub method to replace each match with the result of replace_with_link
    return re.sub(pattern, replace_with_link, text)

def convert_dice_tags(input_string):
    # Regular expression pattern to find {@dice ...} tags
    dice_tag_pattern = r"{@dice ([^|}]+).*?}"

    # Function to replace each match with its first element
    def replace_with_first_element(match):
        # Extract the first element
        first_element = match.group(1)
        return first_element

    # Replace all occurrences of the dice tag
    return re.sub(dice_tag_pattern, replace_with_first_element, input_string)

def convert_condition_tags(input_string):
    pattern = r'{@condition\s(.*?)}'
    modified_content = re.sub(pattern, r'<a href="/compiled_data/conditions/condition-list.html">\1</a>', input_string)
    return modified_content


def convert_action_tags(input_string):
    pattern = r'{@action\s(.*?)}'
    modified_content = re.sub(pattern, r'<a href="/compiled_data/actions/actions.html">\1</a>', input_string)
    return modified_content

def convert_skill_tags(input_string):
    pattern = r'{@skill\s(.*?)}'
    modified_content = re.sub(pattern, r'<a href="/compiled_data/skills/skills.html">\1</a>', input_string)
    return modified_content

def convert_status_tags(input_string):
    pattern = r'{@status\s(.*?)}'
    modified_content = re.sub(pattern, r'<b>\1</b>', input_string)
    return modified_content

def geraldine(in_data, the_state, the_logger):
    content = in_data["template_content_string"]
    content = convert_item_tags_to_links(content)
    content = convert_simple_weapon_tags_to_links(content)
    content = convert_instrument_tags_to_links(content)
    content = convert_dice_tags(content)
    content = convert_condition_tags(content)
    content = convert_action_tags(content)
    content = convert_skill_tags(content)
    content = convert_status_tags(content)

    return content


