{
	"patcher" : 	{
		"fileversion" : 1,
		"rect" : [ 265.0, 97.0, 1167.0, 775.0 ],
		"bglocked" : 0,
		"defrect" : [ 265.0, 97.0, 1167.0, 775.0 ],
		"openrect" : [ 0.0, 0.0, 222.0, 169.0 ],
		"openinpresentation" : 1,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 0,
		"gridsize" : [ 21.0, 21.0 ],
		"gridsnaponopen" : 0,
		"toolbarvisible" : 1,
		"boxanimatetime" : 200,
		"imprint" : 0,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"boxes" : [ 			{
				"box" : 				{
					"maxclass" : "number",
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 724.0, 208.0, 50.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-36",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"varname" : "ignoreKeysGsTileClientPattr",
					"text" : "pattr ignoreKeysGsTileClientPattr",
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 724.0, 185.0, 188.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"id" : "obj-38",
					"fontname" : "Arial",
					"restore" : [ 0 ],
					"saved_object_attributes" : 					{
						"parameter_enable" : 0
					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "message",
					"text" : "linecolor $2 $3 $4 $5",
					"outlettype" : [ "" ],
					"patching_rect" : [ 113.0, 333.0, 122.0, 18.0 ],
					"fontsize" : 12.0,
					"numinlets" : 2,
					"numoutlets" : 1,
					"id" : "obj-46",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "message",
					"text" : "contrast_frame",
					"outlettype" : [ "" ],
					"patching_rect" : [ 84.0, 245.0, 91.0, 18.0 ],
					"fontsize" : 12.0,
					"numinlets" : 2,
					"numoutlets" : 1,
					"id" : "obj-44",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "live.colors",
					"outlettype" : [ "", "bang" ],
					"patching_rect" : [ 84.0, 281.0, 64.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-41",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.line",
					"linecolor" : [ 0.27451, 0.32549, 0.4, 1.0 ],
					"patching_rect" : [ 48.0, 452.0, 5.0, 100.0 ],
					"presentation" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-39",
					"presentation_rect" : [ 1.0, 6.0, 5.0, 155.916534 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"varname" : "gsTileClientPattrstorage",
					"text" : "pattrstorage gsTileClientPattrstorage @savemode 0 @parameter_enable 1",
					"outlettype" : [ "" ],
					"patching_rect" : [ 724.0, 234.0, 409.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"id" : "obj-35",
					"fontname" : "Arial",
					"saved_object_attributes" : 					{
						"storage_rect" : [ 200, 200, 800, 500 ],
						"client_rect" : [ 100, 100, 500, 600 ],
						"paraminitmode" : 0,
						"parameter_enable" : 1
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_type" : 3,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "gsTileClientPattrstorage",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "gsTileClientPattrstorage",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 0,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 127.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 724.0, 162.0, 50.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-33",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 724.0, 112.0, 50.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-32",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"varname" : "randomKeyTwoGsTileClientPattr",
					"text" : "pattr randomKeyTwoGsTileClientPattr",
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 724.0, 139.0, 211.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"id" : "obj-30",
					"fontname" : "Arial",
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"initial" : [ 0 ]
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "randomKeyTwoGsTileClientPattr",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "randomKeyTwoGsTileClientPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 1000.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"varname" : "randomKeyOneGsTileClientPattr",
					"text" : "pattr randomKeyOneGsTileClientPattr",
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 724.0, 90.0, 212.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"id" : "obj-29",
					"fontname" : "Arial",
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"initial" : [ 0 ]
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "randomKeyOneGsTileClientPattr",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "randomKeyOneGsTileClientPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 1000.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 724.0, 64.0, 50.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-9",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"varname" : "parametersLoadedGsTileClientPattr",
					"text" : "pattr parametersLoadedGsTileClientPattr",
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 724.0, 40.0, 229.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"id" : "obj-4",
					"fontname" : "Arial",
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"initial" : [ 1 ]
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 1 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "parametersLoadedGsTileClientPattr",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "parametersLoadedGsTileClientPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 0,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 1,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 127.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 457.0, 609.0, 50.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-27",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 457.0, 559.0, 50.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-26",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 457.0, 509.0, 50.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-24",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 457.0, 459.0, 50.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-23",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 457.0, 409.0, 50.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-21",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 457.0, 359.0, 50.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-19",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 457.0, 309.0, 50.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-17",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 457.0, 259.0, 50.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-16",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 457.0, 209.0, 50.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-14",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 457.0, 162.0, 50.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-13",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 457.0, 112.0, 50.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-10",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 457.0, 64.0, 50.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"id" : "obj-6",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "message",
					"text" : "initialize",
					"outlettype" : [ "" ],
					"patching_rect" : [ 277.0, 241.0, 53.0, 18.0 ],
					"fontsize" : 12.0,
					"numinlets" : 2,
					"numoutlets" : 1,
					"id" : "obj-2",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.toggle",
					"varname" : "live.toggle",
					"outlettype" : [ "" ],
					"patching_rect" : [ 277.0, 204.0, 15.0, 15.0 ],
					"parameter_enable" : 1,
					"numinlets" : 1,
					"numoutlets" : 1,
					"id" : "obj-1",
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 1 ],
							"parameter_type" : 2,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "live.toggle",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "live.toggle",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 0,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 2,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
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
					"maxclass" : "bpatcher",
					"outlettype" : [ "" ],
					"patching_rect" : [ 12.0, 29.0, 211.0, 169.0 ],
					"presentation" : 1,
					"name" : "gs.tile.clientDisplay.maxpat",
					"numinlets" : 1,
					"offset" : [ 0.0, -5.0 ],
					"numoutlets" : 1,
					"id" : "obj-20",
					"presentation_rect" : [ 5.0, 1.0, 218.0, 165.0 ],
					"args" : [  ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "message",
					"text" : "freebang",
					"outlettype" : [ "" ],
					"patching_rect" : [ 344.0, 269.0, 58.0, 18.0 ],
					"fontsize" : 12.0,
					"numinlets" : 2,
					"numoutlets" : 1,
					"id" : "obj-56",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "freebang",
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 344.0, 219.0, 58.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 0,
					"numoutlets" : 1,
					"id" : "obj-54",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "inlet",
					"outlettype" : [ "" ],
					"patching_rect" : [ 211.0, 241.0, 25.0, 25.0 ],
					"numinlets" : 0,
					"numoutlets" : 1,
					"id" : "obj-3",
					"comment" : ""
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "outlet",
					"patching_rect" : [ 253.0, 362.0, 25.0, 25.0 ],
					"numinlets" : 1,
					"numoutlets" : 0,
					"id" : "obj-5",
					"comment" : ""
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "r gs.tile.allClients",
					"outlettype" : [ "" ],
					"patching_rect" : [ 237.0, 155.0, 101.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 0,
					"numoutlets" : 1,
					"id" : "obj-8",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "js gs.tile.client #1",
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 253.0, 322.0, 102.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 2,
					"numoutlets" : 2,
					"id" : "obj-11",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"varname" : "appMonomeWidthGsTileClientPattr",
					"text" : "Pattr appMonomeWidthGsTileClientPattr",
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 457.0, 40.0, 225.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"id" : "obj-7",
					"fontname" : "Arial",
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"initial" : [ 8 ]
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 2.0,
							"parameter_initial" : [ 8 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "width",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "appMonomeWidthGsTileClientPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
							"parameter_steps" : 0,
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
					"maxclass" : "newobj",
					"varname" : "appMonomeHeightGsTileClientPattr",
					"text" : "Pattr appMonomeHeightGsTileClientPattr",
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 457.0, 90.0, 229.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"id" : "obj-12",
					"fontname" : "Arial",
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"initial" : [ 8 ]
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 2.0,
							"parameter_initial" : [ 8 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "pattr",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "appMonomeHeightGsTileClientPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
							"parameter_steps" : 0,
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
					"maxclass" : "newobj",
					"varname" : "appMonomeNumberGsTileClientPattr",
					"text" : "Pattr appMonomeNumberGsTileClientPattr",
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 457.0, 139.0, 237.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"id" : "obj-15",
					"fontname" : "Arial",
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"initial" : [ 1 ]
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 1 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "number",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "appMonomeNumberGsTileClientPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
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
					"maxclass" : "newobj",
					"varname" : "appMonomeLayerGsTileClientPattr",
					"text" : "Pattr appMonomeLayerGsTileClientPattr",
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 457.0, 186.0, 224.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"id" : "obj-18",
					"fontname" : "Arial",
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"initial" : [ 0.0 ]
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0.0 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "layer",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "appMonomeLayerGsTileClientPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
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
					"maxclass" : "newobj",
					"varname" : "appChannelNumberGsTileClientPattr",
					"text" : "Pattr appChannelNumberGsTileClientPattr",
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 457.0, 234.0, 235.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"id" : "obj-22",
					"fontname" : "Arial",
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"initial" : [ 0.0 ]
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0.0 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "channel",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "appChannelNumberGsTileClientPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
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
					"maxclass" : "newobj",
					"varname" : "windowWidthGsTileClientPattr",
					"text" : "Pattr windowWidthGsTileClientPattr",
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 457.0, 284.0, 198.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"id" : "obj-25",
					"fontname" : "Arial",
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"initial" : [ 8 ]
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 2.0,
							"parameter_initial" : [ 8 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "wWidth",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "windowWidthGsTileClientPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
							"parameter_steps" : 0,
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
					"maxclass" : "newobj",
					"varname" : "windowHeightGsTileClientPattr",
					"text" : "Pattr windowHeightGsTileClientPattr",
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 457.0, 334.0, 202.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"id" : "obj-28",
					"fontname" : "Arial",
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"initial" : [ 8 ]
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 8 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "wHeight",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "windowHeightGsTileClientPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
							"parameter_steps" : 0,
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
					"maxclass" : "newobj",
					"varname" : "windowColumnOffsetGsTileClientPattr",
					"text" : "Pattr windowColumnOffsetGsTileClientPattr",
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 458.0, 385.0, 241.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"id" : "obj-31",
					"fontname" : "Arial",
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"initial" : [ 0.0 ]
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0.0 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "wColOffset",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "windowColumnOffsetGsTileClientPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
							"parameter_steps" : 0,
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
					"maxclass" : "newobj",
					"varname" : "windowRowOffsetGsTileClientPattr",
					"text" : "Pattr windowRowOffsetGsTileClientPattr",
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 457.0, 435.0, 223.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"id" : "obj-34",
					"fontname" : "Arial",
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"initial" : [ 0.0 ]
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0.0 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "wRowOffset",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "windowRowOffsetGsTileClientPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
							"parameter_steps" : 0,
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
					"maxclass" : "newobj",
					"varname" : "displayColumnOffsetGsTileClientPattr",
					"text" : "Pattr displayColumnOffsetGsTileClientPattr",
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 457.0, 486.0, 238.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"id" : "obj-37",
					"fontname" : "Arial",
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"initial" : [ 0.0 ]
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : -2048.0,
							"parameter_initial" : [ 0.0 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "colOffset",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "displayColumnOffsetGsTileClientPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
							"parameter_steps" : 0,
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
					"maxclass" : "newobj",
					"varname" : "displayRowOffsetGsTileClientPattr",
					"text" : "Pattr displayRowOffsetGsTileClientPattr",
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 457.0, 537.0, 221.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"id" : "obj-40",
					"fontname" : "Arial",
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"initial" : [ 0.0 ]
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : -2048.0,
							"parameter_initial" : [ 0.0 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "rowOffset",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "displayRowOffsetGsTileClientPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
							"parameter_steps" : 0,
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
					"maxclass" : "newobj",
					"varname" : "comOrderNumberGsTileClientPattr",
					"text" : "Pattr comOrderNumberGsTileClientPattr",
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 457.0, 588.0, 223.0, 20.0 ],
					"fontsize" : 12.0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"id" : "obj-43",
					"fontname" : "Arial",
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"initial" : [ 0.0 ]
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0.0 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "pattr[9]",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "comOrderNumberGsTileClientPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 127.0
						}

					}

				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"source" : [ "obj-20", 0 ],
					"destination" : [ "obj-11", 0 ],
					"hidden" : 0,
					"midpoints" : [ 21.5, 218.5, 262.5, 218.5 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-11", 1 ],
					"destination" : [ "obj-20", 0 ],
					"hidden" : 0,
					"midpoints" : [ 345.5, 357.0, 417.5, 357.0, 417.5, 19.0, 21.5, 19.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-46", 0 ],
					"destination" : [ "obj-39", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-41", 0 ],
					"destination" : [ "obj-46", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-44", 0 ],
					"destination" : [ "obj-41", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-1", 0 ],
					"destination" : [ "obj-44", 0 ],
					"hidden" : 0,
					"midpoints" : [ 286.0, 234.5, 93.5, 234.5 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-30", 0 ],
					"destination" : [ "obj-33", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-29", 0 ],
					"destination" : [ "obj-32", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 0 ],
					"destination" : [ "obj-11", 0 ],
					"hidden" : 0,
					"midpoints" : [ 286.5, 297.0, 262.5, 297.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-1", 0 ],
					"destination" : [ "obj-2", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-8", 0 ],
					"destination" : [ "obj-11", 0 ],
					"hidden" : 0,
					"midpoints" : [ 246.5, 285.5, 262.5, 285.5 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-54", 0 ],
					"destination" : [ "obj-56", 0 ],
					"hidden" : 0,
					"midpoints" : [ 353.5, 253.5, 353.5, 253.5 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-56", 0 ],
					"destination" : [ "obj-11", 0 ],
					"hidden" : 0,
					"midpoints" : [ 353.5, 304.0, 262.5, 304.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-3", 0 ],
					"destination" : [ "obj-11", 0 ],
					"hidden" : 0,
					"midpoints" : [ 220.5, 293.5, 262.5, 293.5 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-11", 0 ],
					"destination" : [ "obj-5", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-7", 0 ],
					"destination" : [ "obj-6", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-12", 0 ],
					"destination" : [ "obj-10", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-15", 0 ],
					"destination" : [ "obj-13", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-18", 0 ],
					"destination" : [ "obj-14", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-22", 0 ],
					"destination" : [ "obj-16", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-25", 0 ],
					"destination" : [ "obj-17", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-28", 0 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-31", 0 ],
					"destination" : [ "obj-21", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-34", 0 ],
					"destination" : [ "obj-23", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-37", 0 ],
					"destination" : [ "obj-24", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-40", 0 ],
					"destination" : [ "obj-26", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-43", 0 ],
					"destination" : [ "obj-27", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-4", 0 ],
					"destination" : [ "obj-9", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-38", 0 ],
					"destination" : [ "obj-36", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
 ],
		"parameters" : 		{
			"obj-20::obj-26" : [ "focus-1-GsTileClient", "live.text", 0 ],
			"obj-29" : [ "randomKeyOneGsTileClientPattr", "randomKeyOneGsTileClientPattr", 0 ],
			"obj-25" : [ "windowWidthGsTileClientPattr", "wWidth", 0 ],
			"obj-35" : [ "gsTileClientPattrstorage", "gsTileClientPattrstorage", 0 ],
			"obj-20::obj-72" : [ "#1-windowColumnOffset", "wColOff", 0 ],
			"obj-20::obj-66" : [ "#1-windowWidth", "wWidth", 0 ],
			"obj-1" : [ "live.toggle", "live.toggle", 2 ],
			"obj-18" : [ "appMonomeLayerGsTileClientPattr", "layer", 0 ],
			"obj-22" : [ "appChannelNumberGsTileClientPattr", "channel", 0 ],
			"obj-4" : [ "parametersLoadedGsTileClientPattr", "parametersLoadedGsTileClientPattr", 1 ],
			"obj-20::obj-64" : [ "#1-appMonomeLayer", "mLayer", 0 ],
			"obj-20::obj-68" : [ "#1-monomeWidth", "mWidth", 0 ],
			"obj-20::obj-8" : [ "live.toggle[1]", "live.toggle", 0 ],
			"obj-15" : [ "appMonomeNumberGsTileClientPattr", "number", 0 ],
			"obj-20::obj-74" : [ "#1-displayColumnOffset", "dColOff", 0 ],
			"obj-20::obj-67" : [ "#1-monomeHeight", "mHeight", 0 ],
			"obj-12" : [ "appMonomeHeightGsTileClientPattr", "pattr", 0 ],
			"obj-31" : [ "windowColumnOffsetGsTileClientPattr", "wColOffset", 0 ],
			"obj-34" : [ "windowRowOffsetGsTileClientPattr", "wRowOffset", 0 ],
			"obj-37" : [ "displayColumnOffsetGsTileClientPattr", "colOffset", 0 ],
			"obj-20::obj-71" : [ "#1-windowRowOffset", "wRowOff", 0 ],
			"obj-40" : [ "displayRowOffsetGsTileClientPattr", "rowOffset", 0 ],
			"obj-20::obj-61" : [ "#1-appMonomeNumber", "mNumber", 0 ],
			"obj-43" : [ "comOrderNumberGsTileClientPattr", "pattr[9]", 0 ],
			"obj-20::obj-29" : [ "live.text[3]", "live.text", 0 ],
			"obj-20::obj-11" : [ "focus-0-GsTileClient", "live.text", 0 ],
			"obj-7" : [ "appMonomeWidthGsTileClientPattr", "width", 0 ],
			"obj-30" : [ "randomKeyTwoGsTileClientPattr", "randomKeyTwoGsTileClientPattr", 0 ],
			"obj-28" : [ "windowHeightGsTileClientPattr", "wHeight", 0 ],
			"obj-20::obj-27" : [ "focus-3-GsTileClient", "live.text", 0 ],
			"obj-20::obj-65" : [ "#1-windowHeight", "wHeight", 0 ],
			"obj-20::obj-73" : [ "#1-displayRowOffset", "dRowOff", 0 ]
		}

	}

}
