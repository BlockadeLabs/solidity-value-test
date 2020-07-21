contract PayAddress {
	function payByValue(address _addr) public payable {
		(bool success, ) = _addr.call.value(msg.value)("");
		require(success, "unable to transfer funds");
	}
}
