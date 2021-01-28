
/** 
 * Transform data from wide to long
 * 
 * @param {A1:D20} data An Array to be pivoted
 * @param {1} ncols Number of fixed columns 
 * @param {1} nrows Number of fixed rows (maximum of 2)
 * @param {"names"} names_to A string specifying the name of the column to create from the data stored in the column names of data
 * @param {"values"} values_to 	A string specifying the name of the column to create from the data stored in cell values.
 * @customfunction
 */

function PIVOT_LONGER(
  data, 
  n_cols, 
  n_rows, 
  names_to,
  values_to


){
  //Set defaults
  var nCols = n_cols || 1;
  var nRows = n_rows || 1;
  var namesTo = names_to || "names";
  var valuesTo = values_to || "values";

  var ret=[], i,j, row, uniqueCols=1;


// This only works for 2d arrays
  if(
    !Array.isArray(data) || 
    data.length < nRows ||
    !Array.isArray(data[0]) ||
    data[0].length < nCols
    ){
      throw new Error('Missing Data')
    }
// Max 2 rows
  if(nRows > 2) {throw new Error('n_rows can be max 2')}
  
// fill empty cells in the first row with value set last in previous columns (for 2 fixed rows)
  var tmp = '';
  for (j=0;j<data[0].length;j++)
    if (data[0][j] != '') 
      tmp = data[0][j];
    else
      data[0][j] = tmp;


// return first row: fix column titles + pivoted values column title + values column title(s)
  row = [];
    for (j=0;j<nCols;j++) row.push(nRows == 2 ? data[0][j]||data[1][j] : data[0][j]); // for 2 fixed rows we try to find the title in row 1 and row 2
    for (j=3;j<arguments.length;j++) row.push(arguments[j]);
  ret.push(row);

  // processing rows (skipping the fixed columns, then dedicating a new row for each pivoted value)
  for (i=nRows; i<data.length && data[i].length > 0; i++)
  {
    // skip totally empty or only whitespace containing rows
    if (data[i].join('').replace(/\s+/g,'').length == 0 ) continue;

    // unpivot the row
    row = [];
    for (j=0;j<nCols && j<data[i].length;j++)
      row.push(data[i][j]);
    for (j=nCols;j<data[i].length;j+=uniqueCols)
      ret.push( 
        row.concat([data[0][j]]) // the first row title value
        .concat(data[i].slice(j,j+uniqueCols)) // pivoted values
      );
  }

  return ret;


}