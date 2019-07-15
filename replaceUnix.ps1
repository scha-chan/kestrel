$files = Get-ChildItem -Path "C:\HBSIS\Projetos\Dashboard_B2BG\dist"-Recurse
foreach ($file in $files){
	$oldJS = '/js/'
	$newJS = '/html/DashboardB2BG/js/'
	$content = Get-Content $($file.FullName) -Raw
	#write replaced content back to the file
	$content -replace $oldJS,$newJS | Out-File $($file.FullName) 
}

$files = Get-ChildItem -Path "C:\HBSIS\Projetos\Dashboard_B2BG\dist"-Recurse
foreach ($file in $files){
	$oldCSS = 'css/'
	$newCSS = 'html/DashboardB2BG/css/'
	$content = Get-Content $($file.FullName) -Raw
	#write replaced content back to the file
	$content -replace $oldCSS,$newCSS | Out-File $($file.FullName) 
}

$files = Get-ChildItem -Path "C:\HBSIS\Projetos\Dashboard_B2BG\dist"-Recurse
foreach ($file in $files){
	$oldIMG = 'img/'
	$newIMG = 'html/DashboardB2BG/img/'
	$content = Get-Content $($file.FullName) -Raw
	#write replaced content back to the file
	$content -replace $oldIMG,$newIMG | Out-File $($file.FullName) 
}