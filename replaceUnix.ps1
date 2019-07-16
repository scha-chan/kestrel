<#$files = Get-ChildItem -Path "C:\HBSIS\Projetos\Dashboard_B2BG\dist" -file -Recurse 
foreach ($file in $files){
	$oldJS = '/js/'
	$newJS = '/html/DashboardB2BG/js/'
	$content = Get-Content $($file.FullName) -Raw
	#write replaced content back to the file
	$content -replace $oldJS,$newJS | Out-File $($file.FullName) 
}

$files = Get-ChildItem -Path "C:\HBSIS\Projetos\Dashboard_B2BG\dist" -file -Recurse
foreach ($file in $files){
	$oldCSS = 'css/'
	$newCSS = 'html/DashboardB2BG/css/'
	$content = Get-Content $($file.FullName) -Raw
	#write replaced content back to the file
	$content -replace $oldCSS,$newCSS | Out-File $($file.FullName) 
}

$files = Get-ChildItem -Path "C:\HBSIS\Projetos\Dashboard_B2BG\dist" -file -Recurse
foreach ($file in $files){
	$oldIMG = 'img/'
	$newIMG = 'html/DashboardB2BG/img/'
	$content = Get-Content $($file.FullName) -Raw
	#write replaced content back to the file
	$content -replace $oldIMG,$newIMG | Out-File $($file.FullName) 
}
#>

function replaceFiles
{
	Param($path,$replaceFrom,$replaceTo)
	$files = Get-ChildItem -Path $path -file -Recurse
	foreach ($file in $files){
		$content = Get-Content $($file.FullName) -Raw
		#write replaced content back to the file
		$content -replace $replaceFrom,$replaceTo | Out-File $($file.FullName) 
	}
}

replaceFiles "C:\HBSIS\Projetos\Dashboard_B2BG\dist" '/js/' '/html/DashboardB2BG/js/'
replaceFiles "C:\HBSIS\Projetos\Dashboard_B2BG\dist" 'css/' 'html/DashboardB2BG/css/'
replaceFiles "C:\HBSIS\Projetos\Dashboard_B2BG\dist" 'img/' 'html/DashboardB2BG/img/'