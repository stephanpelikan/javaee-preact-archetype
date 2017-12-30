package at.phactum.pwa;

import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.AsyncContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.WriteListener;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.MediaType;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class GzAwareServlet extends HttpServlet {

	private static final Logger logger = LoggerFactory.getLogger(GzAwareServlet.class);
	
	private static final Map<String, Long> contentLengths = new ConcurrentHashMap<>();
	
	private static final long serialVersionUID = 1L;
	
	protected boolean deliverArtifact(final String pathInfo, final boolean acceptsGzipEncoding,
			final HttpServletResponse resp, final AsyncContext context)
					throws ServletException, IOException {
		
		final InputStream inStream = determineInputStream(pathInfo, acceptsGzipEncoding, resp);
		if (inStream == null) {
			return false;
		}
		
		if (context == null) {
			deliverArtifactSync(pathInfo, inStream, resp);
		} else {
			deliverArtifactAsync(pathInfo, inStream, resp, context);
		}
		
		return true;
		
	}
	
	private void deliverArtifactAsync(final String pathInfo, final InputStream inStream,
			final HttpServletResponse resp, final AsyncContext context) throws ServletException, IOException {
		
		logger.warn("NIO");
		final boolean contentLengthIsKnown = setResponseHeaders(pathInfo, resp);

		final byte[] buffer = new byte[4096];
		final int[] numberOfBytes = new int[] { 0 };
		
		final ServletOutputStream out = resp.getOutputStream();
		out.setWriteListener(new WriteListener() {
			
			@Override
			public void onWritePossible() throws IOException {
				
				while (out.isReady()) {
					int read = inStream.read(buffer);
					
					numberOfBytes[0] += read;
					logger.warn("JUHU: " + read);
					if (read < 0) {
						storeContentLengthForUpcomingRequests(pathInfo, contentLengthIsKnown, numberOfBytes[0]);
						
						context.complete();
						return;
					}
					
					out.write(buffer, 0, read);
				}
				
			}
			
			@Override
			public void onError(Throwable e) {
				logger.error("Could not send file '{}'", pathInfo, e);
				
				context.complete();
				
				closeInStream(inStream);
			}
		});
		
	}
	
	private void deliverArtifactSync(final String pathInfo, final InputStream inStream,
				final HttpServletResponse resp)
						throws ServletException, IOException {
			
		logger.warn("BIO");
		try {
			
			final boolean contentLengthIsKnown = setResponseHeaders(pathInfo, resp);
			
			try (final ServletOutputStream outStream = resp.getOutputStream()) {
				
				int numberOfBytes = IOUtils.copy(inStream, outStream);
				storeContentLengthForUpcomingRequests(pathInfo, contentLengthIsKnown, numberOfBytes);
				
			}
			
		} finally {
			closeInStream(inStream);
		}
				
	}

	private void closeInStream(final InputStream inStream) {
		try {
			inStream.close();
		} catch (Exception e) {
			logger.warn("Could not close stream", e);
		}
	}

	private boolean setResponseHeaders(final String pathInfo, final HttpServletResponse resp) {

		setContentTypeInResponse(pathInfo, resp);

		final boolean contentLengthIsKnown = setContentLengthInResponse(pathInfo, resp);
		return contentLengthIsKnown;
		
	}
	
	

	private void storeContentLengthForUpcomingRequests(final String pathInfo, final boolean contentLengthIsKnown,
			final int contentLength) {

		if (contentLengthIsKnown) {
			return;
		}
		
		contentLengths.put(pathInfo, new Long(contentLength));
		
	}
	
	private boolean setContentLengthInResponse(final String pathInfo, final HttpServletResponse resp) {
		
		final Long contentLength = contentLengths.get(pathInfo);
		final boolean contentLengthIsKnown = contentLength != null;
		
		if (contentLengthIsKnown) {
			resp.setContentLengthLong(contentLength);
		}
		
		return contentLengthIsKnown;
		
	}
	protected boolean acceptsGzipEncoding(final HttpServletRequest req) {
		
		Enumeration<String> acceptedEncodings = req.getHeaders("Accept-Encoding");
		if (acceptedEncodings == null) {
			return false;
		}
		
		while (acceptedEncodings.hasMoreElements()) {
			
			final String acceptedEncoding = acceptedEncodings.nextElement();
			if (acceptedEncoding.contains("gzip")) {
				return true;
			}
			
		}
		
		return false;
		
	}
	
	private InputStream determineInputStream(final String pathInfo, final boolean acceptsGzipEncoding,
			final HttpServletResponse resp) {
		
		final InputStream gzStream;
		if (acceptsGzipEncoding) {
			gzStream = getServletContext().getResourceAsStream(pathInfo + ".gz");
		} else {
			gzStream = null;
		}
		
		final InputStream inStream;
		if (gzStream != null) {
			inStream = gzStream;
		} else {
			inStream = getServletContext().getResourceAsStream(pathInfo);
		}
		
		if ((resp != null) && (gzStream != null)) {
			resp.setHeader("Content-Encoding", "gzip");
		}
		
		return inStream;
		
	}
	
	private void setContentTypeInResponse(final String pathInfo, final HttpServletResponse resp) {
		
		final String contentType = getServletContext().getMimeType(pathInfo);

		if (contentType == null) {
			resp.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		} else {
			resp.setContentType(contentType);
		}
		
	}
	
}
