package at.phactum.pwa;

import java.io.IOException;

import javax.servlet.AsyncContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;

@WebServlet(urlPatterns = { "/*" }, loadOnStartup = 1/*, asyncSupported = true*/)
public class RouteAwareHtmlServlet extends GzAwareServlet {

	private static final long serialVersionUID = 1L;
	
	private static final String PATH_OF_INDEX_HTML = "/index.html";

	@Override
	protected void doGet(final HttpServletRequest req, final HttpServletResponse resp) throws ServletException, IOException {
		
		final AsyncContext context;
		if (req.isAsyncSupported()) {
			context = req.startAsync();
		} else {
			context = null;
		}
		
		final boolean acceptsGzipEncoding = super.acceptsGzipEncoding(req);
		
		// URL was / -> deliver /index.html
		if (req.getPathInfo() == null) {
			super.deliverArtifact(PATH_OF_INDEX_HTML, acceptsGzipEncoding, resp, context);
			return;
		}
		
		final String[] pathParts = req.getPathInfo().split("/");
		if (pathParts.length == 0) {
			super.deliverArtifact(PATH_OF_INDEX_HTML, acceptsGzipEncoding, resp, context);
			return;
		}
		
		// URL was /...../anyfile.anyextension -> deliver requested resource
		final String lastPart = pathParts[ pathParts.length - 1 ];
		if (lastPart.lastIndexOf('.') != -1) {
			super.deliverArtifact(req.getPathInfo(), acceptsGzipEncoding, resp, context);
			return;
		}
		
		// URL was /...../anything -> try to find entry-point html 
		int pos = pathParts.length;
		while (pos > 1) {
			
			final String currentPath = StringUtils.join(pathParts, '/', 0, pos) + ".html";
			
			if (super.deliverArtifact(currentPath, acceptsGzipEncoding, resp, context)) {
				return;
			}

			--pos;
			
		}
		
		// Nothing found -> deliver /index.html
		super.deliverArtifact(PATH_OF_INDEX_HTML, acceptsGzipEncoding, resp, context);
		
	}
	
}
