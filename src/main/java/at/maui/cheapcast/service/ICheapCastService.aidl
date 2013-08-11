package at.maui.cheapcast.service;

import at.maui.cheapcast.service.ICheapCastCallback;

/**
 * Created with IntelliJ IDEA.
 * User: maui
 * Date: 08.08.13
 * Time: 22:10
 * To change this template use File | Settings | File Templates.
 */
interface ICheapCastService {

    void addListener(ICheapCastCallback cb);
    void removeListener();
}
