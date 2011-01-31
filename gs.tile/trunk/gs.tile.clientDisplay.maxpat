{
	"patcher" : 	{
		"fileversion" : 1,
		"rect" : [ 25.0, 69.0, 1435.0, 641.0 ],
		"bglocked" : 0,
		"defrect" : [ 25.0, 69.0, 1435.0, 641.0 ],
		"openrect" : [ 0.0, 0.0, 0.0, 0.0 ],
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
					"text" : "prepend bgcolor",
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 874.0, 329.0, 97.0, 20.0 ],
					"id" : "obj-4",
					"fontname" : "Arial",
					"numinlets" : 1,
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "inlet",
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 138.0, 11.0, 25.0, 25.0 ],
					"id" : "obj-3",
					"numinlets" : 0,
					"comment" : ""
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "route windowWidth windowHeight windowColumnOffset windowRowOffset appMonomeWidth appMonomeHeight displayColumnOffset displayRowOffset appMonomeNumber appMonomeLayer",
					"numoutlets" : 11,
					"outlettype" : [ "", "", "", "", "", "", "", "", "", "", "" ],
					"patching_rect" : [ 140.0, 43.0, 1111.0, 20.0 ],
					"id" : "obj-2",
					"fontname" : "Arial",
					"numinlets" : 1,
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "m4l.colors surface_bg",
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 825.0, 303.0, 117.0, 18.0 ],
					"id" : "obj-1",
					"fontname" : "Arial Bold",
					"numinlets" : 0,
					"fontsize" : 10.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[9]",
					"presentation_rect" : [ 190.0, 73.0, 36.0, 15.0 ],
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 573.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-71",
					"parameter_enable" : 1,
					"numinlets" : 1,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_steps" : 2049,
							"parameter_exponent" : 1.0,
							"parameter_invisible" : 2,
							"parameter_unitstyle" : 0,
							"parameter_annotation_name" : "",
							"parameter_mmax" : 2048.0,
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
							"parameter_speedlim" : 1.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[8]",
					"presentation_rect" : [ 139.0, 73.0, 36.0, 15.0 ],
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 373.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-72",
					"parameter_enable" : 1,
					"numinlets" : 1,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_steps" : 2049,
							"parameter_exponent" : 1.0,
							"parameter_invisible" : 2,
							"parameter_unitstyle" : 0,
							"parameter_annotation_name" : "",
							"parameter_mmax" : 2048.0,
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
							"parameter_speedlim" : 1.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[7]",
					"presentation_rect" : [ 70.0, 73.0, 36.0, 15.0 ],
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 276.0, 375.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-73",
					"parameter_enable" : 1,
					"numinlets" : 1,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_steps" : 4097,
							"parameter_exponent" : 1.0,
							"parameter_invisible" : 2,
							"parameter_unitstyle" : 0,
							"parameter_annotation_name" : "",
							"parameter_mmax" : 2048.0,
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
							"parameter_speedlim" : 1.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[6]",
					"presentation_rect" : [ 16.0, 73.0, 36.0, 15.0 ],
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 79.0, 375.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-74",
					"parameter_enable" : 1,
					"numinlets" : 1,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_steps" : 4097,
							"parameter_exponent" : 1.0,
							"parameter_invisible" : 2,
							"parameter_unitstyle" : 0,
							"parameter_annotation_name" : "",
							"parameter_mmax" : 2048.0,
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
							"parameter_speedlim" : 1.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[5]",
					"presentation_rect" : [ 74.0, 128.0, 36.0, 15.0 ],
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 948.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-67",
					"parameter_enable" : 1,
					"numinlets" : 1,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_steps" : 2047,
							"parameter_exponent" : 1.0,
							"parameter_invisible" : 2,
							"parameter_unitstyle" : 0,
							"parameter_annotation_name" : "",
							"parameter_mmax" : 2048.0,
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
							"parameter_speedlim" : 1.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[4]",
					"presentation_rect" : [ 20.0, 128.0, 36.0, 15.0 ],
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 764.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-68",
					"parameter_enable" : 1,
					"numinlets" : 1,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_steps" : 2047,
							"parameter_exponent" : 1.0,
							"parameter_invisible" : 2,
							"parameter_unitstyle" : 0,
							"parameter_annotation_name" : "",
							"parameter_mmax" : 2048.0,
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
							"parameter_speedlim" : 1.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[3]",
					"presentation_rect" : [ 190.0, 37.0, 36.0, 15.0 ],
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 216.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-65",
					"parameter_enable" : 1,
					"numinlets" : 1,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_steps" : 2048,
							"parameter_exponent" : 1.0,
							"parameter_invisible" : 2,
							"parameter_unitstyle" : 0,
							"parameter_annotation_name" : "",
							"parameter_mmax" : 2048.0,
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
							"parameter_speedlim" : 1.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox",
					"presentation_rect" : [ 139.0, 37.0, 36.0, 15.0 ],
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 64.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-66",
					"parameter_enable" : 1,
					"numinlets" : 1,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_steps" : 2048,
							"parameter_exponent" : 1.0,
							"parameter_invisible" : 2,
							"parameter_unitstyle" : 0,
							"parameter_annotation_name" : "",
							"parameter_mmax" : 2048.0,
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
							"parameter_speedlim" : 1.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[2]",
					"presentation_rect" : [ 70.0, 37.0, 36.0, 15.0 ],
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 640.0, 375.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-64",
					"parameter_enable" : 1,
					"numinlets" : 1,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_steps" : 0,
							"parameter_exponent" : 1.0,
							"parameter_invisible" : 2,
							"parameter_unitstyle" : 0,
							"parameter_annotation_name" : "",
							"parameter_mmax" : 127.0,
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
							"parameter_speedlim" : 1.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[1]",
					"presentation_rect" : [ 16.0, 37.0, 36.0, 15.0 ],
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"patching_rect" : [ 449.0, 375.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-61",
					"parameter_enable" : 1,
					"numinlets" : 1,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_steps" : 0,
							"parameter_exponent" : 1.0,
							"parameter_invisible" : 2,
							"parameter_unitstyle" : 0,
							"parameter_annotation_name" : "",
							"parameter_mmax" : 127.0,
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
							"parameter_speedlim" : 1.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "start row",
					"presentation_rect" : [ 189.0, 55.0, 60.0, 18.0 ],
					"numoutlets" : 0,
					"patching_rect" : [ 573.0, 155.0, 150.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-55",
					"fontname" : "Arial Bold",
					"numinlets" : 1,
					"fontsize" : 10.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "start col",
					"presentation_rect" : [ 138.0, 55.0, 60.0, 18.0 ],
					"numoutlets" : 0,
					"patching_rect" : [ 373.0, 155.0, 150.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-57",
					"fontname" : "Arial Bold",
					"numinlets" : 1,
					"fontsize" : 10.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "row offset",
					"presentation_rect" : [ 69.0, 55.0, 60.0, 18.0 ],
					"numoutlets" : 0,
					"patching_rect" : [ 276.0, 334.0, 67.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-58",
					"fontname" : "Arial Bold",
					"numinlets" : 1,
					"fontsize" : 10.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "col offset",
					"presentation_rect" : [ 15.0, 55.0, 60.0, 18.0 ],
					"numoutlets" : 0,
					"patching_rect" : [ 79.0, 334.0, 67.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-59",
					"fontname" : "Arial Bold",
					"numinlets" : 1,
					"fontsize" : 10.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "height",
					"presentation_rect" : [ 73.0, 110.0, 45.0, 18.0 ],
					"numoutlets" : 0,
					"patching_rect" : [ 948.0, 155.0, 150.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-50",
					"fontname" : "Arial Bold",
					"numinlets" : 1,
					"fontsize" : 10.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "width",
					"presentation_rect" : [ 19.0, 110.0, 45.0, 18.0 ],
					"numoutlets" : 0,
					"patching_rect" : [ 764.0, 155.0, 150.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-48",
					"fontname" : "Arial Bold",
					"numinlets" : 1,
					"fontsize" : 10.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "height",
					"presentation_rect" : [ 189.0, 19.0, 45.0, 18.0 ],
					"numoutlets" : 0,
					"patching_rect" : [ 216.0, 155.0, 51.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-36",
					"fontname" : "Arial Bold",
					"numinlets" : 1,
					"fontsize" : 10.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "width",
					"presentation_rect" : [ 138.0, 19.0, 45.0, 18.0 ],
					"numoutlets" : 0,
					"patching_rect" : [ 64.0, 155.0, 51.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-34",
					"fontname" : "Arial Bold",
					"numinlets" : 1,
					"fontsize" : 10.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "layer",
					"presentation_rect" : [ 69.0, 19.0, 45.0, 18.0 ],
					"numoutlets" : 0,
					"patching_rect" : [ 640.0, 334.0, 67.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-32",
					"fontname" : "Arial Bold",
					"numinlets" : 1,
					"fontsize" : 10.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "number",
					"presentation_rect" : [ 15.0, 19.0, 45.0, 18.0 ],
					"numoutlets" : 0,
					"patching_rect" : [ 449.0, 334.0, 67.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-30",
					"fontname" : "Arial Bold",
					"numinlets" : 1,
					"fontsize" : 10.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "app monome",
					"presentation_rect" : [ 7.0, 90.0, 88.0, 20.0 ],
					"numoutlets" : 0,
					"patching_rect" : [ 762.0, 127.0, 176.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-28",
					"fontname" : "Arial Bold",
					"numinlets" : 1,
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "window",
					"presentation_rect" : [ 129.0, 0.0, 104.0, 20.0 ],
					"numoutlets" : 0,
					"patching_rect" : [ 72.0, 106.0, 174.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-23",
					"fontname" : "Arial Bold",
					"numinlets" : 1,
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "physical monome",
					"presentation_rect" : [ 3.0, 0.0, 125.0, 20.0 ],
					"numoutlets" : 0,
					"patching_rect" : [ 82.0, 290.0, 118.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-16",
					"fontname" : "Arial Bold",
					"numinlets" : 1,
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setAppMonomeLayer",
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 640.0, 411.0, 172.0, 20.0 ],
					"id" : "obj-10",
					"fontname" : "Arial",
					"numinlets" : 1,
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setAppMonomeNumber",
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 449.0, 411.0, 185.0, 20.0 ],
					"id" : "obj-53",
					"fontname" : "Arial",
					"numinlets" : 1,
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setDisplayRowOffset",
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 276.0, 411.0, 169.0, 20.0 ],
					"id" : "obj-45",
					"fontname" : "Arial",
					"numinlets" : 1,
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setDisplayColumnOffset",
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 79.0, 411.0, 186.0, 20.0 ],
					"id" : "obj-44",
					"fontname" : "Arial",
					"numinlets" : 1,
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setWindowRowOffset",
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 573.0, 232.0, 172.0, 20.0 ],
					"id" : "obj-42",
					"fontname" : "Arial",
					"numinlets" : 1,
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setWindowColumnOffset",
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 373.0, 232.0, 190.0, 20.0 ],
					"id" : "obj-41",
					"fontname" : "Arial",
					"numinlets" : 1,
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setWindowHeight",
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 216.0, 232.0, 151.0, 20.0 ],
					"id" : "obj-39",
					"fontname" : "Arial",
					"numinlets" : 1,
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setWindowWidth",
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 64.0, 232.0, 147.0, 20.0 ],
					"id" : "obj-40",
					"fontname" : "Arial",
					"numinlets" : 1,
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setAppMonomeHeight",
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 948.0, 232.0, 177.0, 20.0 ],
					"id" : "obj-38",
					"fontname" : "Arial",
					"numinlets" : 1,
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setAppMonomeWidth",
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 764.0, 232.0, 173.0, 20.0 ],
					"id" : "obj-37",
					"fontname" : "Arial",
					"numinlets" : 1,
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"presentation_rect" : [ 3.0, 21.0, 121.0, 72.0 ],
					"numoutlets" : 0,
					"bgcolor" : [ 0.666667, 0.698039, 0.717647, 1.0 ],
					"border" : 1,
					"patching_rect" : [ 889.0, 368.0, 18.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-12",
					"numinlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"presentation_rect" : [ 129.0, 21.0, 108.0, 72.0 ],
					"numoutlets" : 0,
					"bgcolor" : [ 0.666667, 0.698039, 0.717647, 1.0 ],
					"border" : 1,
					"patching_rect" : [ 826.0, 368.0, 18.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-13",
					"numinlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"presentation_rect" : [ 7.0, 111.0, 121.0, 35.0 ],
					"numoutlets" : 0,
					"bgcolor" : [ 0.666667, 0.698039, 0.717647, 1.0 ],
					"border" : 1,
					"patching_rect" : [ 957.0, 368.0, 18.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-14",
					"numinlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "outlet",
					"numoutlets" : 0,
					"patching_rect" : [ 1106.0, 479.0, 25.0, 25.0 ],
					"id" : "obj-19",
					"numinlets" : 1,
					"comment" : ""
				}

			}
 ],
		"lines" : [ 			{
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
 ],
		"parameters" : 		{
			"obj-61" : [ "numbox[1]", "num", 0 ],
			"obj-74" : [ "numbox[6]", "num", 0 ],
			"obj-64" : [ "numbox[2]", "num", 0 ],
			"obj-73" : [ "numbox[7]", "num", 0 ],
			"obj-66" : [ "numbox", "num", 0 ],
			"obj-71" : [ "numbox[9]", "num", 0 ],
			"obj-72" : [ "numbox[8]", "num", 0 ],
			"obj-65" : [ "numbox[3]", "num", 0 ],
			"obj-68" : [ "numbox[4]", "num", 0 ],
			"obj-67" : [ "numbox[5]", "num", 0 ]
		}

	}

}
