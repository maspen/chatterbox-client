var NRooks = function(n = {}) {
	// this.coluns = {};
	// this.rows = {}
	this.boards = {}; // { 0: [array containing all combinations of row 0]}
	this.n = n;

	this.buildBoard(this.n);
}
NRooks.prototye.buildBoard(n) {
	this.n = n;

	recurse(row, col,) {
		// base case = when row === n-1 and col === n - 1
		if (row === this.n - 1 && col === n - 1) {
			return;
		}			
		var columns = [];
		columns[row] = 1;
										// iteration 0
		this.boards[row] = []; 			// { 0:[] }
		// IF there are no clonflicts at [row][col]	
			this.boards[row][row] = 1;	// { 0:[1] }

		// for loop

	}

	recurse(0,0);
}


NRooks.prototye.generateBoardsCombinations() {
	if(this.dimensions) {

		/*
		create matrices w. non-conflicting rooks
		for 0 > # rows
			create new matrx
			put in [1][0][0] ...
			add to this.boards at key [i] // 1
			for 0 > # rows
				put in [0][1][0] .... still keu [i] // 1
				for 0 > # rows
					put in [0][0][1]...
		*/

	}


	/*
			recursively: -- could be a lerge marrix.

			// input:  row col n
			// have ready-made "board"
			recurse(row, col) {
	
			}

			recurse(0. 0, n);
	*/
}