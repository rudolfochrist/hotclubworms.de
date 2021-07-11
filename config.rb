# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions
activate :directory_indexes

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

helpers do
  def year_range
    year_started = 2021
    current_year = Date.today.year
    return year_started if year_started == current_year
    return "#{year_started} - #{current_year}"
  end

  def nav_link(link_text, path, options = {})
    options[:class] ||= ""
    options[:class] << "active" if current_page.url.include? path
    link_to(link_text, "#{path}.html", options)
  end
end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

# configure :build do
#   activate :minify_css
#   activate :minify_javascript
# end

after_build do
  files_to_cp = ["favicon.ico"]
  files_to_cp.each do |file|
    src = File.join config[:source], file
    dest = File.join config[:build_dir], file
    FileUtils.cp_r src, dest
  end
end
