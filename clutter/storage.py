
        <table >
            <tr>
                <td>Name:</td>
                <td>{{ name }}</td>
            </tr>
            <tr>
                <td>Source:</td>
                <td>{{ source }}</td>
            </tr>
            <tr>
                <td>Page:</td>
                <td>{{ page }}</td>
            </tr>
            <tr>
                <td>Type:</td>
                <td>{{ type }}</td>
            </tr>
            <tr>
                <td>Rarity:</td>
                <td>{{ rarity }}</td>
            </tr>
            <tr>
                <td>Weight:</td>
                <td>{{ weight }}</td>
            </tr>
            <tr>
                <td>Weapon Category:</td>
                <td>{{ weaponCategory }}</td>
            </tr>
            <tr>
                <td>Property:</td>
                <td>{{ property }}</td>
            </tr>
            <tr>
                <td>Range:</td>
                <td>{{ range }}</td>
            </tr>
            <tr>
                <td>Reload</td>
                <td>{{ reload }}</td>
            </tr>
            <tr>
                <td>Dmg1</td>
                <td>{{ dmg1 }}</td>
            </tr>
            <tr>
                <td>Dmg Type</td>
                <td>{{ dmgType }}</td>
            </tr>
            <tr>
                <td>Firearm</td>
                <td>{{ firearm }}</td>
            </tr>
            <tr>
                <td>Weapon</td>
                <td>{{ weapon }}</td>
            </tr>
            <tr>
                <td>Ammo Type</td>
                <td>{{ ammoType }}</td>
            </tr>
            <tr>
                <td>SRD</td>
                <td>{{ srd }}</td>
            </tr>
            <tr>
                <td>Basic Rules</td>
                <td>{{ basicRules }}</td>
            </tr>
            <tr>
                <td>Value
                    (in copper, divide by 100 for gold)</td>
                <td>{{ value }}</td>
            </tr>
            <tr>
                <td>AC</td>
                <td>{{ ac }}</td>
            </tr>

            <tr>
                <td>Strength</td>
                <td>{{ strength }}</td>
            </tr>
            <tr>
                <td>Stealth</td>
                <td>{{ stealth }}</td>
            </tr>    

            <tr>
                <td>Bonus Weapon</td>
                <td>{{ bonusWeapon }}</td>
            </tr>
            <tr>
                <td>Requires Attunement:</td>
                <td>{{ reqAttune }}</td>
            </tr>
            <tr>
                <td>Wondrous:</td>
                <td>{{ wondrous }}</td>
            </tr>
            <tr>
                <td>Bonus Spell Attack:</td>
                <td>{{ bonusSpellAttack }}</td>
            </tr>
            <tr>
                <td>Bonus Spell Save DC:</td>
                <td>{{ bonusSpellSaveDc }}</td>
            </tr>
            <tr>
                <td>Focus:</td>
                <td>{{ focus  | process_focus}}</td>
            </tr>
            {% if _copy %} 
            <tr>
                <td>Sibling Item Description:</td>
                <td>
                    {{ _copy.name | format_as_item_href }} 
                </td>
            </tr>
            {% endif %}
            {% if attachedSpells %}
            <tr>
                <td>Attached Spells:</td>
                <td>{{ attachedSpells  | json_list_to_html_list }}</td>
            </tr>
            {%  endif %}

        </table>
        <hr/>


        {% if _copy %}
            {% if _copy._mod %}
                {% set extracted_entries = _copy._mod | extract_entries_with_list_type %}
                    {{ extracted_entries | generate_html_from_extracted_entries_data}}
            {% endif %}
        {% endif %}
    
        <hr/>
        


        
        {% if entries or _copy %}
            <p>Note: this raw data is here for testing to ensure the output of the displayed is correct.</p>
            <p>Please verify the displayed data with the raw data to ensure your item has all of the data</p>
        {% endif %}
        
        {% if entries %}
            <pre>{{ entries | tojson(indent=2) }}</pre>
        {% endif %}
        
        {% if _copy %}
        <pre>{{ _copy | tojson(indent=2) }}</pre>
        
        {% endif %}