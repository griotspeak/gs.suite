{
	"patcher" : 	{
		"fileversion" : 1,
		"rect" : [ 25.0, 69.0, 1491.0, 1101.0 ],
		"bglocked" : 0,
		"defrect" : [ 25.0, 69.0, 1491.0, 1101.0 ],
		"openrect" : [ 0.0, 0.0, 0.0, 0.0 ],
		"openinpresentation" : 0,
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
					"maxclass" : "number",
					"varname" : "bang[4]",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 2,
					"minimum" : -2,
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 110.217255, 314.21756, 50.0, 18.0 ],
					"maximum" : 2,
					"id" : "obj-20",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend varname",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 435.717285, 133.46579, 94.0, 18.0 ],
					"id" : "obj-19",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend varname",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 333.717285, 133.46579, 94.0, 18.0 ],
					"id" : "obj-18",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend varname",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 237.717285, 133.46579, 94.0, 18.0 ],
					"id" : "obj-17",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend varname",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 140.717285, 133.46579, 94.0, 18.0 ],
					"id" : "obj-15",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "loadbang",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 39.717255, 2.828964, 55.0, 18.0 ],
					"id" : "obj-13",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "t #1-degreeGsChordObject #1-accidentalGsChordObject #1-octaveGsChordObject #1-splitGsChordObject #1-toggleGsChordObject",
					"linecount" : 2,
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 5,
					"outlettype" : [ "", "", "", "", "" ],
					"patching_rect" : [ 39.717255, 35.828964, 369.0, 29.0 ],
					"id" : "obj-12",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend varname",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 39.717255, 132.46579, 94.0, 18.0 ],
					"id" : "obj-11",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"varname" : "bang[2]",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 2,
					"minimum" : 0,
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 109.717255, 480.200745, 50.0, 18.0 ],
					"maximum" : 5,
					"id" : "obj-14",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "toggle",
					"varname" : "bang",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 109.217255, 640.836609, 20.0, 20.0 ],
					"id" : "obj-16"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setToggle",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 109.217255, 661.92627, 99.0, 18.0 ],
					"id" : "obj-50",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"varname" : "#1-toggleGsChordPattr",
					"text" : "pattr #1-toggleGsChordPattr",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 45.717255, 616.199219, 146.0, 18.0 ],
					"id" : "obj-52",
					"fontname" : "Arial Bold",
					"saved_object_attributes" : 					{
						"initial" : [ 0.0 ],
						"parameter_enable" : 1
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "#1-toggleGsChordPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_steps" : 0,
							"parameter_invisible" : 1,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : "",
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 1.0,
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0.0 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "#1-toggleGsChordPattr",
							"parameter_modmax" : 127.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setSplit",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 104.217255, 578.159119, 89.0, 18.0 ],
					"id" : "obj-47",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"varname" : "bang[1]",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 2,
					"minimum" : 0,
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 104.217255, 554.112976, 50.0, 18.0 ],
					"maximum" : 1,
					"id" : "obj-48",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"varname" : "#1-splitGsChordPattr",
					"text" : "pattr #1-splitGsChordPattr",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 45.717255, 529.475586, 136.0, 18.0 ],
					"id" : "obj-49",
					"fontname" : "Arial Bold",
					"saved_object_attributes" : 					{
						"initial" : [ 0 ],
						"parameter_enable" : 1
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "#1-splitGsChordPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_steps" : 0,
							"parameter_invisible" : 0,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : "",
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 1.0,
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "#1-splitGsChordPattr",
							"parameter_modmax" : 127.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setOctave",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 109.717255, 503.261414, 101.0, 18.0 ],
					"id" : "obj-44",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"varname" : "#1-octaveGsChordPattr",
					"text" : "pattr #1-octaveGsChordPattr",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 45.717255, 457.534363, 147.0, 18.0 ],
					"id" : "obj-46",
					"fontname" : "Arial Bold",
					"saved_object_attributes" : 					{
						"initial" : [ 0 ],
						"parameter_enable" : 1
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "#1-octaveGsChordPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_steps" : 0,
							"parameter_invisible" : 1,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : "",
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 5.0,
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "#1-octaveGsChordPattr",
							"parameter_modmax" : 127.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setAccidental",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 118.217255, 429.349182, 118.0, 18.0 ],
					"id" : "obj-41",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"varname" : "bang[3]",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 2,
					"minimum" : -2,
					"outlettype" : [ "int", "bang" ],
					"patching_rect" : [ 118.217255, 408.104004, 50.0, 18.0 ],
					"maximum" : 2,
					"id" : "obj-42",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"varname" : "#1-accidentalGsChordPattr",
					"text" : "pattr #1-accidentalGsChordPattr",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 45.717255, 383.622162, 164.0, 18.0 ],
					"id" : "obj-43",
					"fontname" : "Arial Bold",
					"saved_object_attributes" : 					{
						"initial" : [ 0 ],
						"parameter_enable" : 1
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "#1-accidentalGsChordPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_steps" : 0,
							"parameter_invisible" : 1,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : "",
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 2.0,
							"parameter_mmin" : -2.0,
							"parameter_initial" : [ 0 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "#1-accidentalGsChordPattr",
							"parameter_modmax" : 127.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setDegree",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 110.217255, 335.727051, 101.0, 18.0 ],
					"id" : "obj-73",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"varname" : "#1-degreeGsChordPattr",
					"text" : "pattr #1-degreeGsChordPattr",
					"numinlets" : 1,
					"fontsize" : 10.0,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 45.717255, 290.0, 148.0, 18.0 ],
					"id" : "obj-38",
					"fontname" : "Arial Bold",
					"saved_object_attributes" : 					{
						"initial" : [ 0.0 ],
						"parameter_enable" : 1
					}
,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "#1-degreeGsChordPattr",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_steps" : 0,
							"parameter_invisible" : 1,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : "",
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 8.0,
							"parameter_mmin" : 1.0,
							"parameter_initial" : [ 0.0 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "#1-degreeGsChordPattr",
							"parameter_modmax" : 127.0
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 232.399994, 708.400024, 25.0, 25.0 ],
					"id" : "obj-64",
					"comment" : ""
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"source" : [ "obj-19", 0 ],
					"destination" : [ "obj-16", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-12", 4 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-18", 0 ],
					"destination" : [ "obj-48", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-12", 3 ],
					"destination" : [ "obj-18", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-17", 0 ],
					"destination" : [ "obj-14", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-12", 2 ],
					"destination" : [ "obj-17", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-15", 0 ],
					"destination" : [ "obj-42", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-12", 1 ],
					"destination" : [ "obj-15", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-11", 0 ],
					"destination" : [ "obj-20", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-12", 0 ],
					"destination" : [ "obj-11", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-41", 0 ],
					"destination" : [ "obj-64", 0 ],
					"hidden" : 0,
					"midpoints" : [ 127.717255, 453.874634, 241.899994, 453.874634 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-44", 0 ],
					"destination" : [ "obj-64", 0 ],
					"hidden" : 0,
					"midpoints" : [ 119.217255, 526.83075, 241.899994, 526.83075 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-73", 0 ],
					"destination" : [ "obj-64", 0 ],
					"hidden" : 0,
					"midpoints" : [ 119.717255, 370.063538, 241.899994, 370.063538 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-50", 0 ],
					"destination" : [ "obj-64", 0 ],
					"hidden" : 0,
					"midpoints" : [ 118.717255, 691.163147, 241.899994, 691.163147 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-47", 0 ],
					"destination" : [ "obj-64", 0 ],
					"hidden" : 0,
					"midpoints" : [ 113.717255, 604.279602, 241.899994, 604.279602 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-14", 0 ],
					"destination" : [ "obj-44", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-48", 0 ],
					"destination" : [ "obj-47", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-42", 0 ],
					"destination" : [ "obj-41", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-16", 0 ],
					"destination" : [ "obj-50", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-43", 1 ],
					"destination" : [ "obj-42", 0 ],
					"hidden" : 0,
					"midpoints" : [ 127.717255, 405.117371, 127.717255, 405.117371 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-46", 1 ],
					"destination" : [ "obj-14", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-49", 1 ],
					"destination" : [ "obj-48", 0 ],
					"hidden" : 0,
					"midpoints" : [ 113.717255, 550.970825, 113.717255, 550.970825 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-52", 1 ],
					"destination" : [ "obj-16", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-13", 0 ],
					"destination" : [ "obj-12", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-38", 1 ],
					"destination" : [ "obj-20", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-20", 0 ],
					"destination" : [ "obj-73", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
 ],
		"parameters" : 		{
			"obj-46" : [ "#1-octaveGsChordPattr", "#1-octaveGsChordPattr", 0 ],
			"obj-38" : [ "#1-degreeGsChordPattr", "#1-degreeGsChordPattr", 0 ],
			"obj-52" : [ "#1-toggleGsChordPattr", "#1-toggleGsChordPattr", 0 ],
			"obj-43" : [ "#1-accidentalGsChordPattr", "#1-accidentalGsChordPattr", 0 ],
			"obj-49" : [ "#1-splitGsChordPattr", "#1-splitGsChordPattr", 0 ]
		}

	}

}
