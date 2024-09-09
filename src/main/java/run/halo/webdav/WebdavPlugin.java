package run.halo.webdav;

import org.springframework.stereotype.Component;

import run.halo.app.plugin.BasePlugin;
import run.halo.app.plugin.PluginContext;

/**
 * @author ryanwang
 * @since 2.0.0
 */
@Component
public class WebdavPlugin extends BasePlugin {

    public WebdavPlugin(PluginContext context) {
        super(context);
    }

    @Override
    public void start() {
        System.out.println("Webdav插件启动成功！");
    }

    @Override
    public void stop() {
        System.out.println("Webdav插件停止！");
    }

}
