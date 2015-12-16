document.addEventListener("DOMContentLoaded",main);

var output, current_list, save_button, check_boxes, addition;
var empty=false;

function main()
{
	output=document.getElementById("output_window");
	save_button=document.getElementById("button");
	addition=document.getElementById("item");
	
	current_list=JSON.parse(localStorage.getItem("grocery-dent0029"));
	if (current_list==undefined)
	{
		empty=true;
	}
	display_items();
	save_button.addEventListener("click",process_click);
}

function display_items()
{
	var item_el, check_el, del_el, row_el, check_content;
	output.innerHTML="<thead><tr><th id='col1'>Grocery Item</th><th id='col2'>Done</th><th id='col3'>Delete?</th></td>";
	if(empty)
	{
		output.innerHTML+="<tr><td>No current items to display</td></tr>";
	}
	else
	{		
		for (var work=0;work<current_list.length;work++)
		{
			row_el=document.createElement("tr");
			check_el=document.createElement("td");
			del_el=document.createElement("td");
			item_el=document.createElement("td");

			item_el.innerHTML=current_list[work].item;

			check_content="<input type='checkbox' class='donechecks'";
			check_el.innerHTML=check_content;

			del_el.innerHTML="<input type='checkbox' class='delchecks'>";

			row_el.appendChild(item_el);
			row_el.appendChild(check_el);
			row_el.appendChild(del_el);
			output.appendChild(row_el);
		}
	}
}


function process_click()
{
	var del_list, check_list;
	
	if (!empty) 
	{
		check_list=document.getElementsByClassName("donechecks");
		del_list=document.getElementsByClassName("delchecks");

		for (var work=del_list.length-1;work>=0;work--)
		{

			current_list[work].done=check_list[work].checked;
			if(del_list[work].checked)
			{
				current_list.splice(work,1);
			}
		}
		
		if(current_list.length==0)
		{
			empty=true;
		}
	}
		
	if (addition.value!="")
	{
		if (current_list==undefined)
		{
			current_list=[{item:"No current items",done:false}];
		}
		else
		{
			current_list.push({item:"",done:false});
		}
		current_list[current_list.length-1].item=addition.value;
		empty=false;
		addition.value="";
	}

	if(empty)
	{
		localStorage.removeItem("grocery-corm0096");
	}
	
	else
	{
		localStorage.setItem("grocery-corm0096",JSON.stringify(current_list));		
	}
	display_items();
}