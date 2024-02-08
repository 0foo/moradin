from pprint import pprint

'''

LIST TYPE
{
    "type": "list",
    "items": [
        "A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed.",
        "The condition ends if the grappler is {@condition incapacitated}.",
        "The condition also ends if an effect removes the grappled creature from the reach of the grappler or grappling effect, such as when a creature is hurled away by the {@spell thunderwave} spell."
    ]
}

TABLE TYPE
{
    "type": "table",
    "colLabels": [
        "Level",
        "Effect"
    ],
    "colStyles": [
        "col-1 text-center",
        "col-11"
    ],
    "rows": [
        [
            "1",
            "Disadvantage on ability checks"
        ],
        [
            "2",
            "Speed halved"
        ],
        [
            "3",
            "Disadvantage on attack rolls and saving throws"
        ],
        [
            "4",
            "Hit point maximum halved"
        ],
        [
            "5",
            "Speed reduced to 0"
        ],
        [
            "6",
            "Death"
        ]
    ]
}

BLANK TYPE
[
    "Any humanoid that spends 12 hours in the necropolis must succeed on a DC 15 Constitution saving throw or contract an arcane blight. This magical disease transforms the humanoid into a {@creature nothic}, but only after the victim experiences hallucinations and feelings of isolation and paranoia. Other symptoms include clammy skin, hair loss, and myopia (nearsightedness).",
    "A player character infected with the arcane blight gains the following flaw: \"I don't trust anyone.\" This flaw, which supersedes any conflicting flaw, is fed by delusions that are difficult for the character to distinguish from reality. Common delusions include the belief that that allies are conspiring to steal the victim's riches or otherwise turn against the victim.",
    "Whenever it finishes a long rest, an infected humanoid must repeat the saving throw. On a successful save, the DC for future saves against the arcane blight drops by {@dice 1d6}. If the saving throw DC drops to 0, the creature overcomes the arcane blight and becomes immune to the effect of further exposure. A creature that fails three of these saving throws transforms into a {@creature nothic} under the DM's control. Only a {@spell wish} spell or divine intervention can undo this transformation.",
    "A {@spell greater restoration} spell or similar magic ends the infection on the target, removing the flaw and all other symptoms, but this magic doesn't protect the target against further exposure."
]

ENTRIES TYPE
"entries": [
				"Activating some magic items requires a user to do something in particular, such as holding the item and uttering a command word, reading the item if it is a scroll, or drinking it if it is a potion. The description of each item category or individual item details how an item is activated. Certain items use one or more of the following rules related to their activation.",
				"If an item requires an action to activate, that action isn't a function of the {@action Use an Object} action, so a feature such as the rogue's {@subclassFeature Fast Hands|Rogue||Thief||3} can't be used to activate the item.",
				{
					"type": "entries",
					"name": "Command Word",
					"entries": [
						"A command word is a word or phrase that must be spoken audibly for the item to operate. A magic item that requires the user to speak a command word can't be activated in the area of any effect that prevents sound, such as the area created by the silence spell."
					]
				},
				{
					"type": "entries",
					"name": "Consumables",
					"entries": [
						"Some items are used up when they are activated. A potion or elixir must be swallowed, or an oil applied to the body. The writing vanishes from a scroll when it is read. Once used, a consumable item loses its magic and no longer functions."
					]
				},
				{
					"type": "entries",
					"name": "Spells",
					"entries": [
						"Some magic items allow the user to cast a spell from the item, often by expending charges from it. The spell is cast at the lowest possible spell and caster level, doesn't expend any of the user's spell slots, and requires no components unless the item's description says otherwise. The spell uses its normal casting time, range, and duration, and the user of the item must concentrate if the spell requires {@status concentration}. Certain items make exceptions to these rules, changing the casting time, duration, or other parts of a spell.",
						"Many items, such as potions, bypass the casting of the spell and confer the spell's effects. Such an item still uses the spell's duration unless the item's description says otherwise.",
						"A magic item, such as certain staffs, may require you to use your own spellcasting ability when you cast a spell from the item. If you have more than one spellcasting ability, you choose which one to use with the item. If you don't have a spellcasting ability\u2014perhaps you're a rogue with the Use Magic Device feature\u2014your spellcasting ability modifier is +0 for the item, and your proficiency bonus does apply."
					]
				},
				{
					"type": "entries",
					"name": "Charges",
					"entries": [
						"Some magic items have charges that you expend to activate its properties. The number of charges an item has remaining is revealed when an identify spell is cast on the item, or when a creature attunes to the item. Additionally, when an item regains charges, the creature attuned to that item learns how many charges it regained."
					]
				}
			]
'''

def list_to_html_bulleted_list(lst):
    html = "<ul>\n"
    for item in lst:
        html += f"  <li>{item}</li>\n"
    html += "</ul>"
    return html

def data_structure_to_html_table(table_data):
    # Begin building the HTML table
    html = "<table>"

    # Add column labels
    col_labels = table_data.get("colLabels", [])
    if col_labels:
        html += "<tr>"
        for label in col_labels:
            html += f"<th>{label}</th>"
        html += "</tr>"

    # Add rows
    rows = table_data.get("rows", [])
    if rows:
        for row in rows:
            html += "<tr>"
            for cell in row:
                html += f"<td>{cell}</td>"
            html += "</tr>"

    # Close the table
    html += "</table>"
    return html

def convert_entries(data):
        out = []

        for item in data:
            if isinstance(item, str):
                out.append(item)
                continue


            if isinstance(item, dict):
                if item.get("type") == "list":
                    the_list = item.get("items")
                    if the_list:
                        the_list = list_to_html_bulleted_list(the_list)
                        out.append(the_list)
                if item.get("type") == "table":
                    print("TABLEEEEEEEEEEEEEEEEEEEEE")
                    table = data_structure_to_html_table(item)
                    out.append(table)


        if len(out) != len(data):
            return data
        
        return list_to_html_bulleted_list(out)
  


