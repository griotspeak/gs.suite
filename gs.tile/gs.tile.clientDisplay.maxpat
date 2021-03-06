{
	"patcher" : 	{
		"fileversion" : 1,
		"rect" : [ 25.0, 69.0, 1268.0, 778.0 ],
		"bglocked" : 0,
		"defrect" : [ 25.0, 69.0, 1268.0, 778.0 ],
		"openrect" : [ 0.0, 0.0, 216.0, 169.0 ],
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
					"maxclass" : "newobj",
					"text" : "prepend setIgnoreKeys",
					"outlettype" : [ "" ],
					"patching_rect" : [ 1413.0, 163.0, 135.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"id" : "obj-6",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.toggle",
					"varname" : "live.toggle",
					"outlettype" : [ "" ],
					"patching_rect" : [ 1404.130005, 117.089996, 15.0, 15.0 ],
					"presentation" : 1,
					"parameter_enable" : 1,
					"numinlets" : 1,
					"numoutlets" : 1,
					"id" : "obj-8",
					"presentation_rect" : [ 183.130005, 150.089996, 15.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_type" : 2,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "live.toggle",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "live.toggle",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 0,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_enum" : [ "off", "on" ],
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 1.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "ignore keys",
					"patching_rect" : [ 1450.0, 137.084778, 174.0, 20.0 ],
					"fontsize" : 12.0,
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-5",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 104.0, 147.084778, 76.529907, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend grabFocus",
					"outlettype" : [ "" ],
					"patching_rect" : [ 1195.0, 232.0, 115.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"id" : "obj-31",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.text",
					"varname" : "focus-3-GsTileClient",
					"outlettype" : [ "", "" ],
					"mode" : 0,
					"patching_rect" : [ 1319.880005, 196.0, 40.0, 20.0 ],
					"presentation" : 1,
					"text" : "4",
					"parameter_enable" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-27",
					"presentation_rect" : [ 177.880035, 120.0, 21.147615, 21.144588 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_type" : 2,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "live.text",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "focus-3-GsTileClient",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 1.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.text",
					"varname" : "focus-2-GsTileClient",
					"outlettype" : [ "", "" ],
					"mode" : 0,
					"patching_rect" : [ 1263.762695, 196.0, 40.0, 20.0 ],
					"presentation" : 1,
					"text" : "3",
					"parameter_enable" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-29",
					"presentation_rect" : [ 154.762665, 120.0, 21.147615, 21.144588 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_type" : 2,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "live.text",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "live.text[3]",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 0,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 1.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.text",
					"varname" : "focus-1-GsTileClient",
					"outlettype" : [ "", "" ],
					"mode" : 0,
					"patching_rect" : [ 1210.117432, 196.0, 40.0, 20.0 ],
					"presentation" : 1,
					"text" : "2",
					"parameter_enable" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-26",
					"presentation_rect" : [ 131.117371, 120.0, 21.147615, 21.144588 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_type" : 2,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "live.text",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "focus-1-GsTileClient",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 1.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.text",
					"varname" : "focus-0-GsTileClient",
					"outlettype" : [ "", "" ],
					"mode" : 0,
					"patching_rect" : [ 1153.0, 196.0, 40.0, 20.0 ],
					"presentation" : 1,
					"text" : "1",
					"parameter_enable" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-11",
					"presentation_rect" : [ 108.0, 120.0, 21.147615, 21.144588 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_type" : 2,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "live.text",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "focus-0-GsTileClient",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 0,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 1.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "grab focus",
					"patching_rect" : [ 1072.0, 15.0, 174.0, 20.0 ],
					"fontsize" : 12.0,
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-7",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 104.0, 91.0, 104.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend bgcolor",
					"outlettype" : [ "" ],
					"patching_rect" : [ 874.0, 329.0, 97.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"id" : "obj-4",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "inlet",
					"outlettype" : [ "" ],
					"patching_rect" : [ 138.0, 11.0, 25.0, 25.0 ],
					"numinlets" : 0,
					"numoutlets" : 1,
					"id" : "obj-3",
					"comment" : ""
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "route windowWidth windowHeight windowColumnOffset windowRowOffset appMonomeWidth appMonomeHeight displayColumnOffset displayRowOffset appMonomeNumber appMonomeLayer focus-0 focus-1 focus-2 focus-3 ignoreKeys",
					"outlettype" : [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ],
					"patching_rect" : [ 69.0, 42.0, 1305.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 16,
					"id" : "obj-2",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "m4l.colors surface_bg",
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 825.0, 303.0, 117.0, 18.0 ],
					"fontsize" : 10.0,
					"numinlets" : 0,
					"numoutlets" : 3,
					"id" : "obj-1",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[9]",
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 573.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"parameter_enable" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-71",
					"presentation_rect" : [ 55.0, 127.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[9]",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 2049,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 2048.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[8]",
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 373.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"parameter_enable" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-72",
					"presentation_rect" : [ 4.0, 127.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[8]",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 2049,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 2048.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[7]",
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 276.0, 375.0, 36.0, 15.0 ],
					"presentation" : 1,
					"parameter_enable" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-73",
					"presentation_rect" : [ 158.0, 71.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : -2048.0,
							"parameter_initial" : [ 0 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[7]",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 4097,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 2048.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[6]",
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 79.0, 375.0, 36.0, 15.0 ],
					"presentation" : 1,
					"parameter_enable" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-74",
					"presentation_rect" : [ 108.0, 71.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : -2048.0,
							"parameter_initial" : [ 0 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[6]",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 4097,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 2048.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[5]",
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 948.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"parameter_enable" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-67",
					"presentation_rect" : [ 54.0, 36.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 2.0,
							"parameter_initial" : [ 8 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[5]",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 2047,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 2048.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[4]",
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 764.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"parameter_enable" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-68",
					"presentation_rect" : [ 4.0, 36.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 2.0,
							"parameter_initial" : [ 8 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[4]",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 2047,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 2048.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[3]",
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 216.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"parameter_enable" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-65",
					"presentation_rect" : [ 55.0, 91.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 1.0,
							"parameter_initial" : [ 8 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[3]",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 2048,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 2048.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox",
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 64.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"parameter_enable" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-66",
					"presentation_rect" : [ 4.0, 91.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 1.0,
							"parameter_initial" : [ 8 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 2048,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 2048.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[2]",
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 640.0, 375.0, 36.0, 15.0 ],
					"presentation" : 1,
					"parameter_enable" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-64",
					"presentation_rect" : [ 158.0, 35.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[2]",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 127.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[1]",
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 449.0, 375.0, 36.0, 15.0 ],
					"presentation" : 1,
					"parameter_enable" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-61",
					"presentation_rect" : [ 108.0, 35.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 1 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[1]",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 127.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "start row",
					"patching_rect" : [ 573.0, 155.0, 139.0, 18.0 ],
					"fontsize" : 10.0,
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-55",
					"fontname" : "Arial",
					"presentation_rect" : [ 54.0, 109.0, 56.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "start col",
					"patching_rect" : [ 373.0, 155.0, 141.0, 18.0 ],
					"fontsize" : 10.0,
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-57",
					"fontname" : "Arial",
					"presentation_rect" : [ 3.0, 109.0, 57.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "row offset",
					"patching_rect" : [ 276.0, 334.0, 63.0, 18.0 ],
					"fontsize" : 10.0,
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-58",
					"fontname" : "Arial",
					"presentation_rect" : [ 152.0, 53.0, 56.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "col offset",
					"patching_rect" : [ 79.0, 334.0, 61.0, 18.0 ],
					"fontsize" : 10.0,
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-59",
					"fontname" : "Arial",
					"presentation_rect" : [ 102.0, 53.0, 55.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "height",
					"patching_rect" : [ 948.0, 155.0, 143.0, 18.0 ],
					"fontsize" : 10.0,
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-50",
					"fontname" : "Arial",
					"presentation_rect" : [ 54.0, 18.0, 43.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "width",
					"patching_rect" : [ 764.0, 155.0, 138.0, 18.0 ],
					"fontsize" : 10.0,
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-48",
					"fontname" : "Arial",
					"presentation_rect" : [ 4.0, 18.0, 42.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "height",
					"patching_rect" : [ 216.0, 155.0, 49.0, 18.0 ],
					"fontsize" : 10.0,
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-36",
					"fontname" : "Arial",
					"presentation_rect" : [ 54.0, 73.0, 43.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "width",
					"patching_rect" : [ 64.0, 155.0, 47.0, 18.0 ],
					"fontsize" : 10.0,
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-34",
					"fontname" : "Arial",
					"presentation_rect" : [ 3.0, 73.0, 42.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "layer",
					"patching_rect" : [ 640.0, 334.0, 63.0, 18.0 ],
					"fontsize" : 10.0,
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-32",
					"fontname" : "Arial",
					"presentation_rect" : [ 158.0, 17.0, 43.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "number",
					"patching_rect" : [ 449.0, 334.0, 63.0, 18.0 ],
					"fontsize" : 10.0,
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-30",
					"fontname" : "Arial",
					"presentation_rect" : [ 108.0, 17.0, 42.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "app monome",
					"patching_rect" : [ 762.0, 127.0, 176.0, 20.0 ],
					"fontsize" : 12.0,
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-28",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 0.0, 0.0, 88.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "window",
					"patching_rect" : [ 67.0, 117.0, 174.0, 20.0 ],
					"fontsize" : 12.0,
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-23",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 0.0, 54.0, 104.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "physical monome",
					"patching_rect" : [ 82.0, 290.0, 118.0, 20.0 ],
					"fontsize" : 12.0,
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-16",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 101.0, 0.0, 112.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setAppMonomeLayer",
					"outlettype" : [ "" ],
					"patching_rect" : [ 640.0, 411.0, 172.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"id" : "obj-10",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setAppMonomeNumber",
					"outlettype" : [ "" ],
					"patching_rect" : [ 449.0, 411.0, 185.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"id" : "obj-53",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setDisplayRowOffset",
					"outlettype" : [ "" ],
					"patching_rect" : [ 276.0, 411.0, 169.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"id" : "obj-45",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setDisplayColumnOffset",
					"outlettype" : [ "" ],
					"patching_rect" : [ 79.0, 411.0, 186.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"id" : "obj-44",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setWindowRowOffset",
					"outlettype" : [ "" ],
					"patching_rect" : [ 573.0, 232.0, 172.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"id" : "obj-42",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setWindowColumnOffset",
					"outlettype" : [ "" ],
					"patching_rect" : [ 373.0, 232.0, 190.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"id" : "obj-41",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setWindowHeight",
					"outlettype" : [ "" ],
					"patching_rect" : [ 216.0, 232.0, 151.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"id" : "obj-39",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setWindowWidth",
					"outlettype" : [ "" ],
					"patching_rect" : [ 64.0, 232.0, 147.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"id" : "obj-40",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setAppMonomeHeight",
					"outlettype" : [ "" ],
					"patching_rect" : [ 948.0, 232.0, 177.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"id" : "obj-38",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setAppMonomeWidth",
					"outlettype" : [ "" ],
					"patching_rect" : [ 764.0, 232.0, 173.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"id" : "obj-37",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"border" : 1,
					"patching_rect" : [ 889.0, 368.0, 18.0, 18.0 ],
					"bgcolor" : [ 0.666667, 0.698039, 0.717647, 1.0 ],
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-12",
					"presentation_rect" : [ 104.0, 19.0, 98.0, 72.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"border" : 1,
					"patching_rect" : [ 826.0, 368.0, 18.0, 18.0 ],
					"bgcolor" : [ 0.666667, 0.698039, 0.717647, 1.0 ],
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-13",
					"presentation_rect" : [ 0.0, 75.0, 98.928757, 72.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"border" : 1,
					"patching_rect" : [ 957.0, 368.0, 18.0, 18.0 ],
					"bgcolor" : [ 0.666667, 0.698039, 0.717647, 1.0 ],
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-14",
					"presentation_rect" : [ 0.0, 19.0, 98.0, 35.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "outlet",
					"patching_rect" : [ 1106.0, 479.0, 25.0, 25.0 ],
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-19",
					"comment" : ""
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"border" : 1,
					"patching_rect" : [ 1006.0, 368.0, 18.0, 18.0 ],
					"bgcolor" : [ 0.666667, 0.698039, 0.717647, 1.0 ],
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-21",
					"presentation_rect" : [ 104.0, 112.0, 98.761154, 35.0 ]
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"source" : [ "obj-8", 0 ],
					"destination" : [ "obj-6", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-6", 0 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-1", 1 ],
					"destination" : [ "obj-4", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-4", 0 ],
					"destination" : [ "obj-13", 0 ],
					"hidden" : 0,
					"midpoints" : [ 883.5, 355.0, 835.5, 355.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-4", 0 ],
					"destination" : [ "obj-12", 0 ],
					"hidden" : 0,
					"midpoints" : [ 883.5, 355.0, 898.5, 355.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-4", 0 ],
					"destination" : [ "obj-14", 0 ],
					"hidden" : 0,
					"midpoints" : [ 883.5, 355.0, 966.5, 355.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-66", 0 ],
					"destination" : [ "obj-40", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-40", 0 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [ 73.5, 325.5, 1115.5, 325.5 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-65", 0 ],
					"destination" : [ "obj-39", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-39", 0 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [ 225.5, 325.5, 1115.5, 325.5 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-72", 0 ],
					"destination" : [ "obj-41", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-41", 0 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [ 382.5, 325.5, 1115.5, 325.5 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-71", 0 ],
					"destination" : [ "obj-42", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-42", 0 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [ 582.5, 325.5, 1115.5, 325.5 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-74", 0 ],
					"destination" : [ "obj-44", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-44", 0 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [ 88.5, 460.0, 897.5, 460.0, 897.5, 390.0, 1115.5, 390.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-73", 0 ],
					"destination" : [ "obj-45", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-45", 0 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [ 285.5, 460.0, 961.0, 460.0, 961.0, 390.0, 1115.5, 390.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-61", 0 ],
					"destination" : [ "obj-53", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-53", 0 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [ 458.5, 460.0, 843.5, 460.0, 843.5, 390.0, 1115.5, 390.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-64", 0 ],
					"destination" : [ "obj-10", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-10", 0 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [ 649.5, 460.0, 875.0, 460.0, 875.0, 390.0, 1115.5, 390.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-37", 0 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [ 773.5, 325.5, 1115.5, 325.5 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-68", 0 ],
					"destination" : [ "obj-37", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-38", 0 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [ 957.5, 325.5, 1115.5, 325.5 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-67", 0 ],
					"destination" : [ "obj-38", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-4", 0 ],
					"destination" : [ "obj-21", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-11", 1 ],
					"destination" : [ "obj-31", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-26", 1 ],
					"destination" : [ "obj-31", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-29", 1 ],
					"destination" : [ "obj-31", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-27", 1 ],
					"destination" : [ "obj-31", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-31", 0 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-3", 0 ],
					"destination" : [ "obj-2", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 9 ],
					"destination" : [ "obj-64", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 8 ],
					"destination" : [ "obj-61", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 7 ],
					"destination" : [ "obj-73", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 6 ],
					"destination" : [ "obj-74", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 5 ],
					"destination" : [ "obj-67", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 4 ],
					"destination" : [ "obj-68", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 3 ],
					"destination" : [ "obj-71", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 2 ],
					"destination" : [ "obj-72", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 1 ],
					"destination" : [ "obj-65", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 0 ],
					"destination" : [ "obj-66", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 10 ],
					"destination" : [ "obj-11", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 11 ],
					"destination" : [ "obj-26", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 12 ],
					"destination" : [ "obj-29", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 13 ],
					"destination" : [ "obj-27", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 14 ],
					"destination" : [ "obj-8", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
 ],
		"parameters" : 		{
			"obj-26" : [ "focus-1-GsTileClient", "live.text", 0 ],
			"obj-61" : [ "numbox[1]", "num", 0 ],
			"obj-68" : [ "numbox[4]", "num", 0 ],
			"obj-8" : [ "live.toggle", "live.toggle", 0 ],
			"obj-64" : [ "numbox[2]", "num", 0 ],
			"obj-67" : [ "numbox[5]", "num", 0 ],
			"obj-66" : [ "numbox", "num", 0 ],
			"obj-74" : [ "numbox[6]", "num", 0 ],
			"obj-73" : [ "numbox[7]", "num", 0 ],
			"obj-29" : [ "live.text[3]", "live.text", 0 ],
			"obj-11" : [ "focus-0-GsTileClient", "live.text", 0 ],
			"obj-71" : [ "numbox[9]", "num", 0 ],
			"obj-72" : [ "numbox[8]", "num", 0 ],
			"obj-65" : [ "numbox[3]", "num", 0 ],
			"obj-27" : [ "focus-3-GsTileClient", "live.text", 0 ]
		}

	}

}
