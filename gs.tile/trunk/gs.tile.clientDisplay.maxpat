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
					"maxclass" : "inlet",
					"numinlets" : 0,
					"patching_rect" : [ 138.0, 11.0, 25.0, 25.0 ],
					"id" : "obj-3",
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"comment" : ""
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "route windowWidth windowHeight windowColumnOffset windowRowOffset appMonomeWidth appMonomeHeight displayColumnOffset displayRowOffset appMonomeNumber appMonomeLayer",
					"numinlets" : 1,
					"patching_rect" : [ 140.0, 43.0, 1111.0, 20.0 ],
					"id" : "obj-2",
					"numoutlets" : 11,
					"fontname" : "Arial",
					"outlettype" : [ "", "", "", "", "", "", "", "", "", "", "" ],
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "m4l.colors surface_bg",
					"numinlets" : 0,
					"patching_rect" : [ 827.0, 332.0, 117.0, 18.0 ],
					"id" : "obj-1",
					"numoutlets" : 1,
					"fontname" : "Arial Bold",
					"outlettype" : [ "" ],
					"fontsize" : 10.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[9]",
					"numinlets" : 1,
					"patching_rect" : [ 573.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-71",
					"numoutlets" : 2,
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 190.0, 73.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
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
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[9]",
							"parameter_modmin" : 0.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[8]",
					"numinlets" : 1,
					"patching_rect" : [ 373.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-72",
					"numoutlets" : 2,
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 139.0, 73.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
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
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[8]",
							"parameter_modmin" : 0.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[7]",
					"numinlets" : 1,
					"patching_rect" : [ 276.0, 375.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-73",
					"numoutlets" : 2,
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 70.0, 73.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
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
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : -2048.0,
							"parameter_initial" : [ 0 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[7]",
							"parameter_modmin" : 0.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[6]",
					"numinlets" : 1,
					"patching_rect" : [ 79.0, 375.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-74",
					"numoutlets" : 2,
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 16.0, 73.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
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
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : -2048.0,
							"parameter_initial" : [ 0 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[6]",
							"parameter_modmin" : 0.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[5]",
					"numinlets" : 1,
					"patching_rect" : [ 948.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-67",
					"numoutlets" : 2,
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 74.0, 128.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
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
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : 2.0,
							"parameter_initial" : [ 8 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[5]",
							"parameter_modmin" : 0.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[4]",
					"numinlets" : 1,
					"patching_rect" : [ 764.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-68",
					"numoutlets" : 2,
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 20.0, 128.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
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
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : 2.0,
							"parameter_initial" : [ 8 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[4]",
							"parameter_modmin" : 0.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[3]",
					"numinlets" : 1,
					"patching_rect" : [ 216.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-65",
					"numoutlets" : 2,
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 190.0, 37.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
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
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : 1.0,
							"parameter_initial" : [ 8 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[3]",
							"parameter_modmin" : 0.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox",
					"numinlets" : 1,
					"patching_rect" : [ 64.0, 196.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-66",
					"numoutlets" : 2,
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 139.0, 37.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
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
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : 1.0,
							"parameter_initial" : [ 8 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox",
							"parameter_modmin" : 0.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[2]",
					"numinlets" : 1,
					"patching_rect" : [ 640.0, 375.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-64",
					"numoutlets" : 2,
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 70.0, 37.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
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
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[2]",
							"parameter_modmin" : 0.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "numbox[1]",
					"numinlets" : 1,
					"patching_rect" : [ 449.0, 375.0, 36.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-61",
					"numoutlets" : 2,
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 16.0, 37.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
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
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 1 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "num",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "numbox[1]",
							"parameter_modmin" : 0.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "start row",
					"numinlets" : 1,
					"patching_rect" : [ 573.0, 155.0, 150.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-55",
					"numoutlets" : 0,
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"presentation_rect" : [ 189.0, 55.0, 60.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "start col",
					"numinlets" : 1,
					"patching_rect" : [ 373.0, 155.0, 150.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-57",
					"numoutlets" : 0,
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"presentation_rect" : [ 138.0, 55.0, 60.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "row offset",
					"numinlets" : 1,
					"patching_rect" : [ 276.0, 334.0, 67.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-58",
					"numoutlets" : 0,
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"presentation_rect" : [ 69.0, 55.0, 60.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "col offset",
					"numinlets" : 1,
					"patching_rect" : [ 79.0, 334.0, 67.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-59",
					"numoutlets" : 0,
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"presentation_rect" : [ 15.0, 55.0, 60.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "height",
					"numinlets" : 1,
					"patching_rect" : [ 948.0, 155.0, 150.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-50",
					"numoutlets" : 0,
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"presentation_rect" : [ 73.0, 110.0, 45.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "width",
					"numinlets" : 1,
					"patching_rect" : [ 764.0, 155.0, 150.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-48",
					"numoutlets" : 0,
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"presentation_rect" : [ 19.0, 110.0, 45.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "height",
					"numinlets" : 1,
					"patching_rect" : [ 216.0, 155.0, 51.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-36",
					"numoutlets" : 0,
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"presentation_rect" : [ 189.0, 19.0, 45.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "width",
					"numinlets" : 1,
					"patching_rect" : [ 64.0, 155.0, 51.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-34",
					"numoutlets" : 0,
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"presentation_rect" : [ 138.0, 19.0, 45.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "layer",
					"numinlets" : 1,
					"patching_rect" : [ 640.0, 334.0, 67.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-32",
					"numoutlets" : 0,
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"presentation_rect" : [ 69.0, 19.0, 45.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "number",
					"numinlets" : 1,
					"patching_rect" : [ 449.0, 334.0, 67.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-30",
					"numoutlets" : 0,
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"presentation_rect" : [ 15.0, 19.0, 45.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "app monome",
					"numinlets" : 1,
					"patching_rect" : [ 762.0, 127.0, 176.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-28",
					"numoutlets" : 0,
					"fontname" : "Arial Bold",
					"fontsize" : 12.0,
					"presentation_rect" : [ 7.0, 90.0, 88.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "window",
					"numinlets" : 1,
					"patching_rect" : [ 72.0, 106.0, 174.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-23",
					"numoutlets" : 0,
					"fontname" : "Arial Bold",
					"fontsize" : 12.0,
					"presentation_rect" : [ 129.0, 0.0, 104.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "physical monome",
					"numinlets" : 1,
					"patching_rect" : [ 82.0, 290.0, 118.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-16",
					"numoutlets" : 0,
					"fontname" : "Arial Bold",
					"fontsize" : 12.0,
					"presentation_rect" : [ 3.0, 0.0, 125.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setAppMonomeLayer",
					"numinlets" : 1,
					"patching_rect" : [ 640.0, 411.0, 172.0, 20.0 ],
					"id" : "obj-10",
					"numoutlets" : 1,
					"fontname" : "Arial",
					"outlettype" : [ "" ],
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setAppMonomeNumber",
					"numinlets" : 1,
					"patching_rect" : [ 449.0, 411.0, 185.0, 20.0 ],
					"id" : "obj-53",
					"numoutlets" : 1,
					"fontname" : "Arial",
					"outlettype" : [ "" ],
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setDisplayRowOffset",
					"numinlets" : 1,
					"patching_rect" : [ 276.0, 411.0, 169.0, 20.0 ],
					"id" : "obj-45",
					"numoutlets" : 1,
					"fontname" : "Arial",
					"outlettype" : [ "" ],
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setDisplayColumnOffset",
					"numinlets" : 1,
					"patching_rect" : [ 79.0, 411.0, 186.0, 20.0 ],
					"id" : "obj-44",
					"numoutlets" : 1,
					"fontname" : "Arial",
					"outlettype" : [ "" ],
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setWindowRowOffset",
					"numinlets" : 1,
					"patching_rect" : [ 573.0, 232.0, 172.0, 20.0 ],
					"id" : "obj-42",
					"numoutlets" : 1,
					"fontname" : "Arial",
					"outlettype" : [ "" ],
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setWindowColumnOffset",
					"numinlets" : 1,
					"patching_rect" : [ 373.0, 232.0, 190.0, 20.0 ],
					"id" : "obj-41",
					"numoutlets" : 1,
					"fontname" : "Arial",
					"outlettype" : [ "" ],
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setWindowHeight",
					"numinlets" : 1,
					"patching_rect" : [ 216.0, 232.0, 151.0, 20.0 ],
					"id" : "obj-39",
					"numoutlets" : 1,
					"fontname" : "Arial",
					"outlettype" : [ "" ],
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setWindowWidth",
					"numinlets" : 1,
					"patching_rect" : [ 64.0, 232.0, 147.0, 20.0 ],
					"id" : "obj-40",
					"numoutlets" : 1,
					"fontname" : "Arial",
					"outlettype" : [ "" ],
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setAppMonomeHeight",
					"numinlets" : 1,
					"patching_rect" : [ 948.0, 232.0, 177.0, 20.0 ],
					"id" : "obj-38",
					"numoutlets" : 1,
					"fontname" : "Arial",
					"outlettype" : [ "" ],
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setAppMonomeWidth",
					"numinlets" : 1,
					"patching_rect" : [ 764.0, 232.0, 173.0, 20.0 ],
					"id" : "obj-37",
					"numoutlets" : 1,
					"fontname" : "Arial",
					"outlettype" : [ "" ],
					"fontsize" : 12.0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"numinlets" : 1,
					"border" : 1,
					"patching_rect" : [ 889.0, 361.0, 18.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-12",
					"numoutlets" : 0,
					"bgcolor" : [ 0.666667, 0.698039, 0.717647, 1.0 ],
					"presentation_rect" : [ 3.0, 21.0, 121.0, 72.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"numinlets" : 1,
					"border" : 1,
					"patching_rect" : [ 826.0, 361.0, 18.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-13",
					"numoutlets" : 0,
					"bgcolor" : [ 0.666667, 0.698039, 0.717647, 1.0 ],
					"presentation_rect" : [ 129.0, 21.0, 108.0, 72.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"numinlets" : 1,
					"border" : 1,
					"patching_rect" : [ 957.0, 361.0, 18.0, 18.0 ],
					"presentation" : 1,
					"id" : "obj-14",
					"numoutlets" : 0,
					"bgcolor" : [ 0.666667, 0.698039, 0.717647, 1.0 ],
					"presentation_rect" : [ 7.0, 111.0, 121.0, 35.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "outlet",
					"numinlets" : 1,
					"patching_rect" : [ 1106.0, 479.0, 25.0, 25.0 ],
					"id" : "obj-19",
					"numoutlets" : 0,
					"comment" : ""
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"source" : [ "obj-1", 0 ],
					"destination" : [ "obj-13", 0 ],
					"hidden" : 0,
					"midpoints" : [ 836.5, 355.0, 835.5, 355.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-1", 0 ],
					"destination" : [ "obj-12", 0 ],
					"hidden" : 0,
					"midpoints" : [ 836.5, 355.0, 898.5, 355.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-1", 0 ],
					"destination" : [ "obj-14", 0 ],
					"hidden" : 0,
					"midpoints" : [ 836.5, 355.0, 966.5, 355.0 ]
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
					"source" : [ "obj-38", 0 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [ 957.5, 325.5, 1115.5, 325.5 ]
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
					"source" : [ "obj-37", 0 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [ 773.5, 325.5, 1115.5, 325.5 ]
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
					"source" : [ "obj-64", 0 ],
					"destination" : [ "obj-10", 0 ],
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
					"source" : [ "obj-61", 0 ],
					"destination" : [ "obj-53", 0 ],
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
					"source" : [ "obj-73", 0 ],
					"destination" : [ "obj-45", 0 ],
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
					"source" : [ "obj-74", 0 ],
					"destination" : [ "obj-44", 0 ],
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
					"source" : [ "obj-71", 0 ],
					"destination" : [ "obj-42", 0 ],
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
					"source" : [ "obj-72", 0 ],
					"destination" : [ "obj-41", 0 ],
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
					"source" : [ "obj-65", 0 ],
					"destination" : [ "obj-39", 0 ],
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
					"source" : [ "obj-66", 0 ],
					"destination" : [ "obj-40", 0 ],
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
					"source" : [ "obj-2", 1 ],
					"destination" : [ "obj-65", 0 ],
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
					"source" : [ "obj-2", 3 ],
					"destination" : [ "obj-71", 0 ],
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
					"source" : [ "obj-2", 5 ],
					"destination" : [ "obj-67", 0 ],
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
					"source" : [ "obj-2", 7 ],
					"destination" : [ "obj-73", 0 ],
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
					"source" : [ "obj-2", 9 ],
					"destination" : [ "obj-64", 0 ],
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
 ],
		"parameters" : 		{
			"obj-73" : [ "numbox[7]", "num", 0 ],
			"obj-66" : [ "numbox", "num", 0 ],
			"obj-71" : [ "numbox[9]", "num", 0 ],
			"obj-72" : [ "numbox[8]", "num", 0 ],
			"obj-65" : [ "numbox[3]", "num", 0 ],
			"obj-68" : [ "numbox[4]", "num", 0 ],
			"obj-67" : [ "numbox[5]", "num", 0 ],
			"obj-61" : [ "numbox[1]", "num", 0 ],
			"obj-74" : [ "numbox[6]", "num", 0 ],
			"obj-64" : [ "numbox[2]", "num", 0 ]
		}

	}

}
