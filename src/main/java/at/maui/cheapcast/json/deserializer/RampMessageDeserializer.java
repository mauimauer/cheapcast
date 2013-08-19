/*
 * Copyright 2013 Sebastian Mauer
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package at.maui.cheapcast.json.deserializer;

import at.maui.cheapcast.chromecast.model.ramp.RampMessage;
import at.maui.cheapcast.chromecast.model.ramp.RampResponse;
import at.maui.cheapcast.chromecast.model.ramp.RampVolume;
import com.google.gson.*;

import java.lang.reflect.Type;

public class RampMessageDeserializer implements JsonDeserializer<RampMessage> {

    @Override
    public RampMessage deserialize(JsonElement jsonElement, Type type, JsonDeserializationContext jsonDeserializationContext) throws JsonParseException {
        if(jsonElement.isJsonObject()) {
            JsonObject obj = jsonElement.getAsJsonObject();
            String t = obj.getAsJsonPrimitive("type").getAsString();

            if(t.equals("VOLUME")) {
                return jsonDeserializationContext.deserialize(jsonElement, RampVolume.class);
            } else if(t.equals("STATUS") || t.equals("RESPONSE")) {
                return jsonDeserializationContext.deserialize(jsonElement, RampResponse.class);
            }
        }
        return null;
    }
}
