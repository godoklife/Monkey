package com.monkey.mpox.config;

import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.RequestContextListener;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.ServletRequestEvent;
import javax.servlet.http.HttpServletRequest;

@Component
public class IpAddress extends RequestContextListener {

    private static final String REQUEST_ATTRIBUTES_ATTRIBUTE =
            IpAddress.class.getName()+".REQUEST_ATTRIBUTES";

    @Override
    public void requestInitialized(ServletRequestEvent requestEvent) {
        if( ! (requestEvent.getServletRequest() instanceof HttpServletRequest)){
            throw new IllegalArgumentException("Request is not an HttpServletRequest : "+requestEvent.getServletRequest());
        }else {
            HttpServletRequest request = (HttpServletRequest) requestEvent.getServletRequest();
            ServletRequestAttributes attributes = new ServletRequestAttributes(request);
            request.setAttribute(REQUEST_ATTRIBUTES_ATTRIBUTE, attributes);
            RequestContextHolder.setRequestAttributes(attributes,true);
        }
    }


    public String getUserIp(){

        String ip = null;
        HttpServletRequest request =
                ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();

        ip = request.getHeader("X-Forwarded-For");

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-RealIP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("REMOTE_ADDR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

        return ip;
    }

}
