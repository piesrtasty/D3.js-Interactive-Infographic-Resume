
var data = {
	"name": "",
	"children": [
			{"name": "", "children":[
				{"name": "Ideation"},
				{"name": "Communication"},
				{"name": "Creative Execution"},
				{"name": "HME Brand Management"},
				{"name": "Brand Expression"}
			]},
			{"name": "Brand Image Photography"},
			{"name": "", "children":[
				{"name": "Home Shopping Network"},
				{"name": "Brand Experience"},
				{"name": "Brand Personality"},
				{"name": "Celebrity Packaging"}
			]},
			{"name": "Brand Development"},
			{"name": "", "children":[
				{"name": "Grey Entertainment"},
				{"name": "Network Television"}
			]},
			{"name": "Recording Labels"},
			{"name": "", "children":[
				{"name": "Crossroads"},
				{"name": "Content"},
				{"name": "Exec Producer"}
			]},
			{"name": "Fashion"},
			{"name": "", "children":[
				{"name": "Ash Ledonne"},
				{"name": "Marketing"},
				{"name": "Stage Events"},
				{"name": "Graphic Design"},
				{"name": "Broadway"}
			]},
				{"name":"Client Management"},
				{"name":"Project Management"},
                {"name": "Cross-Functional"},
				{"name":"Caren Martineau"},
				{"name":"Creative Direction"},
				{"name":"Brand Strategy"}

	]
}

var r = 940 / 2;

var tree = d3.layout.tree()
    .size([360, r - 120])

    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var vis = d3.select("#tree-container").append("svg")
    .attr("width", r * 2 + 20)
		.attr("height", r * 2 - 29)
  .append("g")
    .attr("transform", "translate(" + r + "," + r + ")");

var nodes0 = tree.nodes(data);

var link = vis.selectAll("path.link")
 		.data(tree.links(nodes0))
	.enter().append("path")
    .attr("class", "link")
    .attr("d", diagonal);

var node = vis.selectAll("g.node")
    .data(nodes0)
  .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

node.append("circle")
		.attr("r", 3);

node.append("text")
    .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
    .attr("dy", ".31em")
    .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
    .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
    .text(function(d) { return d.name; });

// Change text color to white
d3.select("#tree-container").selectAll("text")
	.attr("fill", "black")

$(d3.selectAll("text")[0]).each(function()	{

	if ($(this).text() == "Caren Martineau")	{
		$(this).parent().css("font-weight", "bold");
		$(this).parent().css("font-size", "18px");
	} else if ($(this).text() == "HME Brand Management")	{
		$(this).parent().css("font-weight", "bold");
	} else if ($(this).text() == "brand@hmecorp.net")	{
		$(this).parent().css("font-weight", "bold");
	} else if ($(this).text() == "Home Shopping Network")	{
		$(this).parent().css("font-weight", "bold");
        $(this).parent().css("cursor", "default");
	} else if ($(this).text() == "Grey Entertainment")	{
		$(this).parent().css("font-weight", "bold");
        $(this).parent().css("cursor", "default");
	} else if ($(this).text() == "Crossroads")	{
		$(this).parent().css("font-weight", "bold");
        $(this).parent().css("cursor", "default");
	} else if ($(this).text() == "Ash Ledonne")	{
		$(this).parent().css("font-weight", "bold");
        $(this).parent().css("cursor", "default");
	}

})

ui = {
        nodeGroup: node,
        linkGroup: link
    };

var assets = {}

function setupMouseEvents()
{
    ui.nodeGroup.on('mouseover', function(d, i)
    {
        d3.select(this).select("circle").classed("hover", true);
        var labelText = $(this).find("text").text();
        var newLabelText = labelText.replace(/ /g,"_");
        $("#" + newLabelText).fadeIn();
    })
        .on('mouseout', function(d, i)
        {
            d3.select(this).select("circle").classed("hover", false);
            	
            var labelText = $(this).find("text").text();
        	var newLabelText = labelText.replace(/ /g,"_");

            if (labelText == "Ideation")    {
                $("#" + newLabelText).hide();
            } else if (labelText == "Communication")    {
                $("#" + newLabelText).hide();
            } else if (labelText == "Creative Execution")    {
                $("#" + newLabelText).hide();
            } else if (labelText == "Brand Expression")    {
                $("#" + newLabelText).hide();
            } else if (labelText == "Brand Experience")    {
                $("#" + newLabelText).hide();
            } else if (labelText == "Brand Image Photography")    {
                $("#" + newLabelText).hide();
            } else if (labelText == "Fashion")    {
                $("#" + newLabelText).hide();
            } else if (labelText == "Graphic Design")    {
                $("#" + newLabelText).hide();
            }
        })
        .on('click', function(nd, i)
        {
        	var label_text = $(this).find("text").text()
        	$("#node-meta-data-main").html(label_dialogs[label_text]);
        	$("#node-meta-data-container").fadeIn();

            // Walk parent chain
            var ancestors = [];
            var parent = nd;
            while (!_.isUndefined(parent)) {
                ancestors.push(parent);
                parent = parent.parent;
            }

            // Get the matched links
            var matchedLinks = [];
            ui.linkGroup.selectAll('path.link')
                .filter(function(d, i)
                {
                    return _.any(ancestors, function(p)
                    {
                        return p === d.target;
                    });
                })
                .each(function(d)
                {
                    matchedLinks.push(d);
                });
        });
}
setupMouseEvents();