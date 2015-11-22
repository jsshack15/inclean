
angular


    .module('app', ['angularFileUpload'])
     .controller('AppController', ['$http','$scope','FileUploader', function($http,$scope, FileUploader) {
		$scope.desc='';
		$scope.loc='';
	var uploader = $scope.uploader = new FileUploader({
		autoUpload: true,
		url: '/upload/',
		removeAfterUpload: true,	
	});
	$scope.uploader.onBeforeUploadItem = onBeforeUploadItem;

	function onBeforeUploadItem(item) {
	  item.formData.push({desc: $scope.desc});
	  item.formData.push({loc: $scope.loc});
	  console.log(item);
	}
	$scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
}])
    .controller('search',['$http','$scope',function($http,$scope){
    	$scope.userlist='';
    	$scope.piclist='';
    	$scope.loca='';
    	$scope.fetchusers = function()
    	{
    		$http.put('/search/users/' + $scope.loca).then(function(response) {
    			$scope.userlist = response.data;
    		});
    	};
    	$scope.fetchpics = function()
    	{
    		$http.put('/search/pics/' + $scope.loca).then(function(response) {
    			$scope.piclist = response.data;
    			console.log(response.data);
    		});
    	};
    }]);