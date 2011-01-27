{
	"patcher" : 	{
		"fileversion" : 1,
		"rect" : [ 946.0, 143.0, 683.0, 705.0 ],
		"bglocked" : 0,
		"defrect" : [ 946.0, 143.0, 683.0, 705.0 ],
		"openrect" : [ 0.0, 0.0, 75.0, 120.0 ],
		"openinpresentation" : 1,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 0,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 0,
		"toolbarvisible" : 1,
		"boxanimatetime" : 200,
		"imprint" : 0,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"boxes" : [ 			{
				"box" : 				{
					"maxclass" : "inlet",
					"id" : "obj-2",
					"outlettype" : [ "" ],
					"numinlets" : 0,
					"patching_rect" : [ 295.0, 45.0, 25.0, 25.0 ],
					"numoutlets" : 1,
					"comment" : ""
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "message",
					"text" : "set",
					"id" : "obj-5",
					"fontname" : "Arial",
					"outlettype" : [ "" ],
					"fontsize" : 12.0,
					"numinlets" : 2,
					"patching_rect" : [ 318.0, 409.0, 32.5, 18.0 ],
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "sel ignore",
					"id" : "obj-1",
					"fontname" : "Arial",
					"outlettype" : [ "bang", "" ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"patching_rect" : [ 318.0, 376.0, 63.0, 20.0 ],
					"numoutlets" : 2
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "m4l.panel_colors",
					"id" : "obj-57",
					"fontname" : "Arial Bold",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 252.0, 129.0, 92.0, 18.0 ],
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "t i i",
					"id" : "obj-56",
					"fontname" : "Arial Bold",
					"outlettype" : [ "int", "int" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 50.0, 100.0, 32.5, 18.0 ],
					"numoutlets" : 2
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "midiparse",
					"id" : "obj-40",
					"fontname" : "Arial Bold",
					"outlettype" : [ "", "", "", "int", "int", "int", "int" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 107.0, 137.0, 100.0, 18.0 ],
					"numoutlets" : 7
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend set",
					"id" : "obj-13",
					"fontname" : "Arial Bold",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 197.5, 372.847107, 67.0, 18.0 ],
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"presentation" : 1,
					"id" : "obj-14",
					"fontname" : "Arial Bold",
					"fontsize" : 12.0,
					"presentation_rect" : [ 6.0, 58.0, 60.0, 20.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 277.5, 450.847168, 61.0, 20.0 ],
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.menu",
					"varname" : "live.menu",
					"presentation" : 1,
					"id" : "obj-16",
					"parameter_enable" : 1,
					"outlettype" : [ "", "", "float" ],
					"pictures" : [  ],
					"presentation_rect" : [ 6.0, 16.0, 60.0, 15.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 161.0, 249.0, 100.0, 15.0 ],
					"numoutlets" : 3,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "ignore", "store", "recall" ],
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : "",
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 2,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "live.menu[1]",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "live.menu[1]",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 0,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_steps" : 0,
							"parameter_invisible" : 2
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.menu",
					"varname" : "#1clipstepPresetMenu",
					"presentation" : 1,
					"id" : "obj-28",
					"parameter_enable" : 1,
					"outlettype" : [ "", "", "float" ],
					"pictures" : [  ],
					"presentation_rect" : [ 6.0, 37.0, 60.0, 15.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 147.5, 201.0, 100.0, 15.0 ],
					"numoutlets" : 3,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127" ],
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : "",
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 2,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "#1clipstepPresetMenu",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "#1clipstepPresetMenu",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 0,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_steps" : 0,
							"parameter_invisible" : 2
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "message",
					"text" : "$2 $1",
					"id" : "obj-29",
					"fontname" : "Arial Bold",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 2,
					"patching_rect" : [ 147.5, 299.0, 36.0, 16.0 ],
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "route ignore",
					"id" : "obj-31",
					"fontname" : "Arial Bold",
					"outlettype" : [ "", "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 147.5, 323.0, 69.0, 18.0 ],
					"numoutlets" : 2
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "pack 0 s",
					"id" : "obj-34",
					"fontname" : "Arial Bold",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 2,
					"patching_rect" : [ 147.5, 273.0, 50.0, 18.0 ],
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "t i b",
					"id" : "obj-38",
					"fontname" : "Arial Bold",
					"outlettype" : [ "int", "bang" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 147.5, 223.0, 32.5, 18.0 ],
					"numoutlets" : 2
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"presentation" : 1,
					"id" : "obj-70",
					"border" : 1,
					"presentation_rect" : [ 1.0, 1.0, 70.0, 108.0 ],
					"bgcolor" : [ 0.666667, 0.698039, 0.717647, 1.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 252.0, 154.0, 31.0, 15.0 ],
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "inlet",
					"id" : "obj-58",
					"outlettype" : [ "" ],
					"numinlets" : 0,
					"patching_rect" : [ 50.0, 40.0, 25.0, 25.0 ],
					"numoutlets" : 1,
					"comment" : ""
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "outlet",
					"id" : "obj-59",
					"numinlets" : 1,
					"patching_rect" : [ 50.0, 431.847168, 25.0, 25.0 ],
					"numoutlets" : 0,
					"comment" : "untouched midi stream"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "outlet",
					"id" : "obj-61",
					"numinlets" : 1,
					"patching_rect" : [ 278.0, 368.847168, 25.0, 25.0 ],
					"numoutlets" : 0,
					"comment" : ""
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"source" : [ "obj-31", 1 ],
					"destination" : [ "obj-61", 0 ],
					"hidden" : 0,
					"midpoints" : [ 207.0, 354.423584, 287.5, 354.423584 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-29", 0 ],
					"destination" : [ "obj-31", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-31", 1 ],
					"destination" : [ "obj-13", 0 ],
					"hidden" : 0,
					"midpoints" : [ 207.0, 356.423553, 207.0, 356.423553 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-5", 0 ],
					"destination" : [ "obj-14", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-1", 0 ],
					"destination" : [ "obj-5", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-16", 1 ],
					"destination" : [ "obj-1", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-56", 0 ],
					"destination" : [ "obj-59", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-58", 0 ],
					"destination" : [ "obj-56", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-57", 0 ],
					"destination" : [ "obj-70", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-38", 0 ],
					"destination" : [ "obj-34", 0 ],
					"hidden" : 0,
					"midpoints" : [ 157.0, 256.5, 157.0, 256.5 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-34", 0 ],
					"destination" : [ "obj-29", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-28", 0 ],
					"destination" : [ "obj-38", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-38", 1 ],
					"destination" : [ "obj-16", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-16", 1 ],
					"destination" : [ "obj-34", 1 ],
					"hidden" : 0,
					"midpoints" : [ 211.0, 268.0, 188.0, 268.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-13", 0 ],
					"destination" : [ "obj-14", 0 ],
					"hidden" : 0,
					"midpoints" : [ 207.0, 399.847137, 287.0, 399.847137 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-40", 3 ],
					"destination" : [ "obj-28", 0 ],
					"hidden" : 0,
					"midpoints" : [ 157.0, 177.0, 157.0, 177.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-56", 1 ],
					"destination" : [ "obj-40", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 0 ],
					"destination" : [ "obj-28", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
 ],
		"parameters" : 		{
			"obj-28" : [ "#1clipstepPresetMenu", "#1clipstepPresetMenu", 0 ],
			"obj-16" : [ "live.menu[1]", "live.menu[1]", 0 ]
		}

	}

}
